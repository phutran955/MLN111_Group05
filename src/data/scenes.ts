import { assets } from '../config/assets';
import type { Scene } from '../types/game';
export const scenes: Scene[] = [
  {
    id: 1, chapter: '01 / KHỞI ĐẦU', dateLabel: 'NGÀY 01 · 16:30', location: 'SÂN TRƯỜNG ĐẠI HỌC', title: 'Ra trường: an toàn hay trải nghiệm?', background: assets.backgrounds.graduation, character: assets.characters.player_student,
    dialogues: [
      { type: 'narration', text: 'Tiếng vỗ tay đã lắng xuống. Bạn đứng lại giữa sân trường, tấm bằng trong tay và một tương lai chưa có bản đồ.' },
      { speaker: 'Bạn', text: 'Bốn năm qua, mình đã học cách giải quyết rất nhiều bài toán. Nhưng bài toán tiếp theo… không có đáp án ở cuối giáo trình.' },
      { type: 'narration', text: 'Một startup gửi lời mời với mức lương khiêm tốn nhưng nhiều cơ hội trải nghiệm. Trong khi đó, công việc đúng chuyên ngành có thể cần thêm thời gian chờ đợi.' },
    ],
    choices: [ { id: 'A', title: 'Trải nghiệm thực tế', description: 'Gia nhập startup. Bắt đầu từ những việc nhỏ, học qua va chạm và thử sức ở nhiều vai trò.', effects: { practice: 1 } }, { id: 'B', title: 'Phát huy chuyên môn', description: 'Chờ một cơ hội phù hợp với chuyên ngành để vận dụng nền tảng đã tích lũy.', effects: { theory: 1 } } ],
    reflection: 'Đây là lựa chọn mở đầu giữa việc ưu tiên nền tảng chuyên môn và ưu tiên trải nghiệm thực tế. Mỗi hướng đi mang theo một cơ hội và một giới hạn.',
  },
  {
    id: 2, chapter: '02 / NHỮNG NGÀY ĐẦU', dateLabel: 'NGÀY 48 · 09:14', location: 'VĂN PHÒNG', title: 'Khi giáo trình chưa đủ', background: assets.backgrounds.office, character: assets.characters.coworker_1,
    dialogues: [ { speaker: 'Minh · Đồng nghiệp', text: 'Team mình xử lý toàn bộ dự án trên công cụ này. Chiều nay bạn thử cập nhật phần việc của mình nhé.' }, { type: 'narration', text: 'Màn hình mở ra một phần mềm hoàn toàn xa lạ. Ở trường, bạn được học nguyên lý, nhưng chưa từng được dùng công cụ này.' }, { speaker: 'Bạn', text: 'Mình hiểu quy trình. Nhưng để hoàn thành công việc hôm nay, mình còn thiếu một bước.' } ],
    choices: [ { id: 'A', title: 'Giữ nguyên những gì đã học', description: 'Tiếp tục sử dụng phương pháp quen thuộc và đề nghị làm việc theo kiến thức đã được đào tạo.', effects: { theory: 1, resolution: -1 } }, { id: 'B', title: 'Chủ động thích nghi', description: 'Tự học công cụ mới, nhờ đồng nghiệp hướng dẫn và áp dụng ngay vào công việc.', effects: { practice: 1, resolution: 1 } } ],
    reflection: 'Khoảng cách giữa đào tạo và công việc hiện ra trong một công cụ cụ thể. Thực tiễn đặt ra yêu cầu bổ sung và kiểm nghiệm điều đã học.',
  },
  {
    id: 3, chapter: '02 / NHỮNG NGÀY ĐẦU', dateLabel: 'THÁNG 03 · 10:00', location: 'PHÒNG HỌP', title: 'Sếp yêu cầu làm khác giáo trình', background: assets.backgrounds.meeting_room, character: assets.characters.manager,
    dialogues: [ { speaker: 'Quản lý', text: 'Khách hàng này có quy trình riêng. Chúng ta dùng cách đã triển khai nhiều năm, dù nó hơi khác mô hình bạn trình bày.' }, { speaker: 'Bạn', text: 'Nhưng mô hình mình học giúp kiểm soát rủi ro tốt hơn. Liệu cách cũ có đang bỏ qua điều gì?' }, { type: 'narration', text: 'Trên bàn là một giáo trình được đánh dấu kỹ và một bộ hồ sơ dự án đã thành công. Bạn cần đưa ra cách làm cho tuần tới.' } ],
    choices: [ { id: 'A', title: 'Bảo vệ nguyên tắc', description: 'Giữ phương pháp theo giáo trình, vì tính chặt chẽ của mô hình là cơ sở bạn tin tưởng.', effects: { theory: 1, resolution: -1 } }, { id: 'B', title: 'Kết hợp lý luận và kinh nghiệm', description: 'Tìm hiểu vì sao công ty làm như vậy, rồi kết hợp nguyên lý đã học với kinh nghiệm của đội.', effects: { practice: 1, resolution: 2 } } ],
    reflection: 'Kinh nghiệm có bối cảnh; lý luận có khả năng khái quát. Mâu thuẫn trở thành cơ hội khi bạn xem xét điều kiện vận dụng của cả hai.',
  },
  {
    id: 4, chapter: '02 / NHỮNG NGÀY ĐẦU', dateLabel: 'THÁNG 06 · 15:45', location: 'KHU LÀM VIỆC NHÓM', title: 'Chuyên môn và làm việc nhóm', background: assets.backgrounds.office, character: assets.characters.coworker_2,
    dialogues: [ { type: 'narration', text: 'Bản đề xuất của bạn rất chi tiết. Nhưng cuộc họp thứ ba trong tuần vẫn kết thúc bằng một cuộc tranh luận chưa có hồi kết.' }, { speaker: 'Linh · Đồng nghiệp', text: 'Mình hiểu giải pháp của bạn. Nhưng nhóm cần một cách mà tất cả có thể cùng triển khai, trong thời gian chúng ta đang có.' }, { speaker: 'Bạn', text: 'Mình muốn giữ chất lượng chuyên môn. Có lẽ điều khó nhất là đưa nó vào cách làm chung.' } ],
    choices: [ { id: 'A', title: 'Tập trung vào chuyên môn', description: 'Ưu tiên chất lượng phần việc của mình, tiếp tục bảo vệ cách tiếp cận chuyên môn hiện tại.', effects: { theory: 1, resolution: -1 } }, { id: 'B', title: 'Thay đổi để thích nghi', description: 'Lắng nghe đồng nghiệp, điều chỉnh cách trao đổi và phối hợp để cả nhóm làm việc hiệu quả.', effects: { practice: 1, resolution: 1 } } ],
    reflection: 'Năng lực nghề nghiệp được thực hiện trong quan hệ với người khác. Kiến thức chỉ phát huy đầy đủ khi có cách tổ chức và phối hợp phù hợp.',
  },
  {
    id: 5, chapter: '03 / THÍCH NGHI', dateLabel: 'NĂM 01 · 22:10', location: 'CĂN PHÒNG CỦA BẠN', title: 'Áp lực tài chính', background: assets.backgrounds.bedroom, character: assets.characters.player_employee,
    dialogues: [ { type: 'narration', text: 'Tiền thuê nhà, sinh hoạt phí, một khoản gửi về gia đình. Bạn nhìn bảng chi tiêu bên cạnh bản hợp đồng công việc đúng chuyên ngành.' }, { speaker: 'Bạn', text: 'Mình thích công việc này. Nhưng mức lương hiện tại khiến mỗi tháng đều là một phép tính khó.' }, { type: 'narration', text: 'Một vị trí khác có thu nhập tốt hơn, nhưng ít liên quan đến chuyên môn. Không có lựa chọn nào xóa đi mọi áp lực.' } ],
    choices: [ { id: 'A', title: 'Ưu tiên thu nhập', description: 'Chuyển sang công việc có thu nhập tốt hơn để đáp ứng những nhu cầu thực tế trước mắt.', effects: { practice: 1 } }, { id: 'B', title: 'Duy trì chuyên môn', description: 'Tiếp tục phát triển trong ngành đã học, sắp xếp lại chi tiêu và tìm cơ hội tiến xa hơn.', effects: { theory: 1, resolution: 1 } } ],
    reflection: 'Điều kiện vật chất ảnh hưởng trực tiếp đến lựa chọn nghề nghiệp. Duy trì chuyên môn cũng cần một phương án thực tế để vượt qua khó khăn.',
  },
  {
    id: 6, chapter: '03 / THÍCH NGHI', dateLabel: 'NĂM 02 · 08:50', location: 'KHÔNG GIAN LÀM VIỆC AI', title: 'Kỷ nguyên AI', background: assets.backgrounds.ai_workspace, character: assets.characters.coworker_1,
    dialogues: [ { speaker: 'Minh · Đồng nghiệp', text: 'Bản tổng hợp hôm qua, công cụ AI làm nháp trong vài phút. Nhưng có hai số liệu sai mà mình phải kiểm tra lại.' }, { type: 'narration', text: 'Những việc từng mất cả buổi đang thay đổi. Công nghệ mở ra khả năng mới, đồng thời đặt ra câu hỏi về năng lực và trách nhiệm.' }, { speaker: 'Bạn', text: 'Nếu một công cụ có thể làm nhanh hơn, vai trò của mình sẽ thay đổi thế nào?' } ],
    choices: [ { id: 'A', title: 'Giữ phương pháp cũ', description: 'Tiếp tục tự thực hiện theo phương pháp đã học, dựa vào nền tảng chuyên môn quen thuộc.', effects: { theory: 1, resolution: -1 } }, { id: 'B', title: 'Làm chủ công nghệ', description: 'Sử dụng AI hỗ trợ, kiểm tra thông tin và chịu trách nhiệm về kết quả cuối cùng.', effects: { practice: 1, resolution: 1 } } ],
    reflection: 'Công cụ mới làm thay đổi cách lao động. Khả năng kiểm tra và chịu trách nhiệm đòi hỏi cả nền tảng hiểu biết lẫn kinh nghiệm sử dụng.',
  },
  {
    id: 7, chapter: '04 / PHÁT TRIỂN', dateLabel: 'NĂM 03 · 14:20', location: 'PHÒNG HỌP', title: 'Ý tưởng mới bị bác bỏ', background: assets.backgrounds.meeting_room, character: assets.characters.manager,
    dialogues: [ { speaker: 'Quản lý', text: 'Ý tưởng có lý. Nhưng quy trình hiện tại vẫn hoạt động, và tôi chưa thấy cơ sở để cả đội thay đổi lúc này.' }, { type: 'narration', text: 'Bạn đã dành nhiều buổi tối xây dựng đề xuất cải tiến. Các lập luận đều rõ ràng, nhưng quản lý vẫn chưa bị thuyết phục.' }, { speaker: 'Bạn', text: 'Mình cần làm gì để khoảng cách giữa một ý tưởng tốt và một thay đổi thật sự được thu hẹp?' } ],
    choices: [ { id: 'A', title: 'Bảo vệ bằng lý luận', description: 'Bổ sung lập luận và mô hình chuyên môn để chứng minh sự hợp lý của đề xuất.', effects: { theory: 1, resolution: -1 } }, { id: 'B', title: 'Kiểm nghiệm bằng thực tế', description: 'Đề xuất thử nghiệm nhỏ, thu thập dữ liệu và dùng kết quả để tiếp tục trao đổi.', effects: { practice: 1, resolution: 1 } } ],
    reflection: 'Thực tiễn là nơi kiểm nghiệm nhận thức. Một thử nghiệm có thể cung cấp cơ sở để sửa đổi, bổ sung hoặc khẳng định ý tưởng ban đầu.',
  },
  {
    id: 8, chapter: '04 / PHÁT TRIỂN', dateLabel: 'NĂM 04 · 09:30', location: 'PHÒNG ĐÀO TẠO', title: 'Áp lực reskilling', background: assets.backgrounds.training_room, character: assets.characters.hr,
    dialogues: [ { speaker: 'Nhân sự', text: 'Từ quý tới, vai trò của nhóm sẽ thay đổi. Công ty có chương trình đào tạo kỹ năng mới để mọi người cùng chuyển tiếp.' }, { type: 'narration', text: 'Bạn không còn là người mới. Vậy mà giáo trình hôm nay lại khiến bạn có cảm giác bắt đầu từ đầu.' }, { speaker: 'Bạn', text: 'Những điều mình đã tích lũy có còn giá trị? Hay mình có thể dùng chúng để học điều mới tốt hơn?' } ],
    choices: [ { id: 'A', title: 'Bám vào chuyên môn cũ', description: 'Tiếp tục đầu tư vào lĩnh vực quen thuộc, giữ cách làm đã thành thạo nhiều năm.', effects: { theory: 1, resolution: -1 } }, { id: 'B', title: 'Học mới, giữ nền tảng', description: 'Học kỹ năng mới và kết nối chúng với kiến thức, kinh nghiệm đã tích lũy.', effects: { practice: 1, resolution: 1 } } ],
    reflection: 'Phát triển có tính kế thừa. Học lại không nhất thiết là xóa bỏ cái cũ, mà có thể là tổ chức lại nền tảng trong điều kiện mới.',
  },
  {
    id: 9, chapter: '04 / PHÁT TRIỂN', dateLabel: 'NĂM 05 · 17:40', location: 'VĂN PHÒNG', title: 'Khi công việc đã ổn định', background: assets.backgrounds.office, character: assets.characters.player_employee,
    dialogues: [ { type: 'narration', text: 'Bạn đã có một công việc ổn định, thu nhập tương đối tốt và sự tin tưởng của đồng nghiệp. Lần đầu tiên, lịch tuần tới không khiến bạn lo lắng.' }, { speaker: 'Bạn', text: 'Mình đã đi được một đoạn đường dài. Có nên giữ nhịp sống này, hay tìm một điều gì tiếp theo?' }, { type: 'narration', text: 'Ngoài ô cửa, thành phố vẫn chuyển động. Không có yêu cầu khẩn cấp nào buộc bạn phải thay đổi hôm nay.' } ],
    choices: [ { id: 'A', title: 'Duy trì trạng thái hiện tại', description: 'Tiếp tục với cách làm quen thuộc và sự ổn định đã có, chưa đặt thêm mục tiêu phát triển.', effects: { resolution: -1 } }, { id: 'B', title: 'Chủ động phát triển', description: 'Bổ sung kiến thức, thử những nhiệm vụ mới và chuẩn bị cho các thay đổi phía trước.', effects: { theory: 1, practice: 1, resolution: 1 } } ],
    reflection: 'Sự ổn định là một trạng thái trong quá trình vận động. Chủ động học hỏi giúp nhận diện những mâu thuẫn mới trước khi chúng trở thành sức ép.',
  },
  {
    id: 10, chapter: '05 / DẪN DẮT', dateLabel: 'NĂM 07 · 08:00', location: 'VĂN PHÒNG QUẢN LÝ', title: 'Trở thành quản lý', background: assets.backgrounds.manager_office, character: assets.characters.player_manager,
    dialogues: [ { type: 'narration', text: 'Bảng tên trên cửa đã thay đổi. Bạn trở thành quản lý đúng lúc doanh nghiệp đối mặt với chi phí tăng, khách hàng thay đổi và một đội ngũ đang mất phương hướng.' }, { speaker: 'Bạn', text: 'Ngày trước, mình tìm cách hoàn thành phần việc của mình. Hôm nay, lựa chọn của mình sẽ ảnh hưởng đến cả một đội ngũ.' }, { type: 'narration', text: 'Trên bàn là những mô hình quản lý bạn từng học, cùng báo cáo về con người và nguồn lực hiện có. Hành trình này đưa bạn trở lại câu hỏi đầu tiên, ở một vị trí khác.' } ],
    choices: [ { id: 'A', title: 'Áp dụng mô hình có sẵn', description: 'Triển khai một mô hình quản lý đã được hệ thống hóa, giữ các nguyên tắc và quy trình của mô hình.', effects: { theory: 1, resolution: -1 } }, { id: 'B', title: 'Vận dụng phù hợp', description: 'Phân tích điều kiện thực tế rồi vận dụng nền tảng lý luận để xây dựng phương thức quản lý.', effects: { practice: 1, resolution: 1 } } ],
    reflection: 'Lý luận định hướng hoạt động; thực tiễn cung cấp điều kiện và kiểm nghiệm kết quả. Quản lý đòi hỏi vận dụng trong hoàn cảnh cụ thể và tiếp tục điều chỉnh.',
  },
];
