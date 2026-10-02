# Giữa Hai Thế Giới

Web game narrative choice bằng tiếng Việt, khám phá mâu thuẫn giữa **lý luận và thực tiễn** trong giáo dục, đào tạo và việc làm. Người chơi trải qua 10 bước ngoặt từ tốt nghiệp đến quản lý. Game chạy hoàn toàn client-side, không backend, database, đăng nhập hoặc API server.

## Chạy dự án

Yêu cầu Node.js **22.12+** (hoặc 20.19+) và npm.

```bash
npm install
npm run dev
```

Mở URL do Vite hiển thị, mặc định `http://localhost:5173`.

```bash
npm run lint
npm run test
npm run build
npm run preview
```

`npm run build` kiểm tra TypeScript strict và xuất website tĩnh vào `dist/`. `npm run preview` phục vụ bản production, mặc định cổng 4173. Các dependency được khóa trong `package-lock.json`; dùng `npm ci` cho CI.

## Stack và kiến trúc

Vite · React · TypeScript · Tailwind CSS (Vite plugin) · Framer Motion · Lucide React. Native HTMLAudioElement quản lý audio; Web Audio cung cấp hiệu ứng tương tác nhẹ khi chưa có tệp âm thanh. Không cần Howler cho phạm vi hiện tại.

```text
src/
  components/  ChoiceCard, DialogueBox, ScoreHUD, CareerTimeline,
               SceneTransition, ScoreChange, TechPanel, Modal, SceneArt
  pages/       LandingPage, IntroPage, GamePage, EndingPage
  data/        scenes.ts, endings.ts
  hooks/       useGameState, useAudio, useLocalStorage
  store/       gameStore.ts
  config/      assets.ts, stats.ts
  types/       game.ts
  utils/       calculateEnding.ts, game.test.ts
  styles/      index.css
scripts/
  generate-placeholders.mjs
public/assets/
  backgrounds/
  characters/
  ui/
  icons/
  audio/
  music/
```

`App.tsx` điều phối các màn hình và cài đặt; nội dung 10 cảnh nằm trong dữ liệu. Các màn intro/game/ending dùng React lazy/Suspense. Chỉ preload background và nhân vật của cảnh hiện tại cùng cảnh tiếp theo. Không có SPA router hoặc URL phụ nên refresh không cần rewrite đặc biệt.

## Game flow

Landing → intro có typewriter → 10 cảnh → phân tích nghề nghiệp → ending → mở YOUR JOURNEY → chơi lại.

Mỗi cảnh: chapter/date/location → bối cảnh và nhân vật → thoại từng câu → hai lựa chọn → khóa lựa chọn → đổi chỉ số → suy ngẫm → tiếp tục. Nhấn/chạm khung thoại để hiện hết câu, nhấn lần nữa để đọc câu kế. Enter/Space hỗ trợ tiếp tục, Tab điều hướng nút. Không thể chọn trước khi thoại hoàn tất. Hai lựa chọn dùng cùng phong cách, không hiển thị điểm trước lựa chọn hoặc thông báo đúng/sai.

Lưu ngay khi bắt đầu, sau mỗi lựa chọn và khi chuyển cảnh. Refresh sau lựa chọn sẽ khôi phục chính cảnh đó với lựa chọn đã khóa, suy ngẫm và nút tiếp tục; không cộng lại điểm. CONTINUE từ landing mở tiến trình hoặc kết quả đã hoàn tất. NEW GAME / PLAY AGAIN có dialog xác nhận nếu đã có lựa chọn.

## Thay asset

Tất cả URL nằm tại **`src/config/assets.ts`**. Background và character của từng cảnh lấy URL từ **`src/data/scenes.ts`**.

Đã có 9 background SVG, 7 nhân vật SVG và favicon tự tạo, không cần tải asset bên ngoài. SVG là minh họa vector nhỏ; có thể thay bằng WebP cho background, PNG/WebP có alpha cho nhân vật. Chỉ cập nhật URL tương ứng trong `assets.ts`:

```ts
// Ví dụ thay entry của bảng backgrounds/characters:
office: '/assets/backgrounds/office.webp'
player_student: '/assets/characters/player_student.webp'
```

Hoặc thay nội dung SVG tại đúng đường dẫn đang dùng. Dùng ảnh nền tỉ lệ khoảng 5:4, nhân vật toàn thân có nền trong suốt. Trên mobile background crop theo khung ngắn hơn, nên giữ chi tiết quan trọng gần tâm. Hình hỏng/thiếu bị ẩn và nền CSS gradient, grid, icon kiến trúc cùng silhouette vẫn hoạt động.

Background dự kiến: `university`, `graduation`, `bedroom`, `job_search`, `office`, `meeting_room`, `training_room`, `ai_workspace`, `manager_office`.

Nhân vật dự kiến: `player_student`, `player_employee`, `player_manager`, `manager`, `coworker_1`, `coworker_2`, `hr`.

Âm thanh tại `public/assets/audio/`: `hover.wav`, `click.wav`, `confirm.wav`, `score_up.wav`, `score_down.wav`, `transition.wav`, `ending.wav`. Đã có 7 cue PCM nhẹ tự tạo. Hook hỗ trợ các cue trên; luồng mặc định dùng hover (sau khi đã tương tác), click, confirm, transition, ending, không dùng âm thanh thất bại để đánh giá lựa chọn. Nhạc nền: `public/assets/music/ambient.wav`, một loop ambient tự tạo 12 giây. Có thể thay bằng MP3/OGG và đổi URL trong `assets.ts`. Music mặc định OFF, SFX ON; audio chỉ mở sau thao tác người dùng. Tệp thiếu được bỏ qua; cue tổng hợp dự phòng được dùng nếu tệp hiệu ứng không tải được.

`ui/` dành cho panel/button thay thế; `icons/` hiện có favicon. Các icon giao diện hiện dùng Lucide nên không phụ thuộc ảnh icon ngoài.

Có thể tái tạo toàn bộ SVG và WAV bằng `node scripts/generate-placeholders.mjs` (**lệnh này ghi đè placeholder tại các tên trên**, không chạy sau khi đã thay bằng asset riêng).

## Thêm cảnh và chỉnh điểm

Thêm một object theo interface `Scene` trong `src/data/scenes.ts`. Scene cần id tuần tự, chapter, location, title, URL background, dialogues, hai choices A/B và reflection. Component dùng cùng dữ liệu để render mọi cảnh, timeline và journey summary.

Chỉnh `effects` để đổi điểm. Mọi trường không có trong effects được coi là 0. **Bản hiện tại giữ nguyên toàn bộ scoring trong yêu cầu**. `applyChoice` trong `src/store/gameStore.ts` cộng theory/practice và luôn dùng `Math.max(0, resolution + delta)` sau mỗi lựa chọn. `src/config/stats.ts` đặt thang HUD ở 10. Nếu thêm cảnh hoặc đổi thang, cập nhật thang HUD, nội dung intro/ending, các test và bump version save để tránh đọc lịch sử cũ bằng dữ liệu mới. Việc chuyển tới ending tự dựa vào độ dài `scenes`.

## Ending logic và giới hạn của scoring

`src/utils/calculateEnding.ts` giữ thứ tự và điều kiện yêu cầu:

1. G ≥ 5 → GIẢI QUYẾT MÂU THUẪN.
2. G < 5 và L > T → TUYỆT ĐỐI HÓA LÝ LUẬN.
3. G < 5 và T > L → TUYỆT ĐỐI HÓA THỰC TIỄN.
4. G < 5 và L = T → MÂU THUẪN CHƯA ĐƯỢC GIẢI QUYẾT.

**Mâu thuẫn trong yêu cầu gốc:** chín cảnh ngoài cảnh 9 đều cộng đúng 1 điểm vào L hoặc T. Cảnh 9 cộng 0 (A) hoặc 2 (B) vào L+T. Tổng cuối luôn là **9 hoặc 11**, đều lẻ, vì vậy **L = T không thể xảy ra**. Đã có đủ 4 định nghĩa, giao diện và nhánh logic, nhưng chỉ **3 ending có thể đạt từ một lượt chơi đủ 10 cảnh**. Để ending 4 trở nên đạt được cần đồng ý thay scoring hoặc điều kiện ending; dự án không tự sửa các quy tắc đã yêu cầu giữ nguyên.

Tests duyệt **1.024 hành trình**, so từng bước với bảng điểm độc lập, kiểm tra resolution, vòng save/load và ba ending đạt được. Test riêng xác nhận đủ bốn điều kiện ending, gồm nhánh L = T và ranh giới G = 5.

## Save và settings

Key: `between-two-worlds-save`.

```json
{
  "version": 1,
  "theory": 0,
  "practice": 1,
  "resolution": 0,
  "currentScene": 0,
  "choices": [{ "sceneId": 1, "choiceId": "A" }],
  "gameStarted": true,
  "gameCompleted": false
}
```

`currentScene` là index bắt đầu từ 0. Save giữ cảnh hiện tại tới khi người chơi nhấn tiếp tục. `saveGame()`, `loadGame()`, `clearSave()` được export từ `gameStore.ts`. Save được kiểm tra version, index, thứ tự lịch sử, choice hợp lệ và tổng điểm tính lại. JSON lỗi hoặc không khớp bị reset an toàn. Trình duyệt chặn storage không làm crash; game tiếp tục trong bộ nhớ và thông báo không thể tự lưu.

Settings lưu riêng tại `between-two-worlds-settings`: `{ music, sfx, reducedMotion }`. Reduced Motion của hệ điều hành luôn được tôn trọng; cài đặt trong game cũng tắt typewriter và animation CSS. Các popup dùng native dialog, hỗ trợ Escape, giữ focus bên trong và trả focus khi đóng.

SHARE RESULT dùng Web Share API; nếu không hỗ trợ sẽ copy text vào clipboard. Nếu cả hai bị chặn, text kết quả hiện ra để tự sao chép. Không gửi dữ liệu lên server.

## Vercel

1. Đưa repository lên GitHub/GitLab/Bitbucket và import vào Vercel, hoặc chạy Vercel CLI trong thư mục này.
2. Framework: **Vite**. Build: **npm run build**. Output: **dist**. Install: **npm install** hoặc **npm ci**.
3. Không cần environment variables, serverless functions hay database.

`vercel.json` đã khai báo framework/build/output. Dự án chưa được publish lên một tài khoản Vercel; production build sẵn sàng deploy.

## Kiểm tra giao diện

Target chính desktop, có breakpoint laptop/tablet/mobile, choice stack trên mobile nhỏ; không cố định chiều cao màn chơi. Semantic button, focus ring, score có số và nhãn ngoài màu, dialog native, reduced motion và màu tương phản rõ. Hình minh họa trang trí được ẩn khỏi screen reader.

Ước lượng 10–15 phút là thời gian đọc và cân nhắc; người chơi có thể đi nhanh hơn bằng cách hoàn tất thoại. Game không cố tình chờ để kéo dài thời lượng. Chưa có kết quả Lighthouse đo thực tế.
