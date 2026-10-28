import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const write = (name, data) => fs.writeFileSync(path.join(root, 'be/data', name), JSON.stringify(data, null, 2) + '\n');
write('game1-quiz.json', {
  title: 'Dấu mốc lịch sử', subtitle: 'Đường lối kháng chiến và hành trình thống nhất 1965–1975',
  description: 'Trả lời 5 câu hỏi dựa trên tài liệu Lãnh đạo cách mạng cả nước 1965–1975.',
  questions: [
    ['Hội nghị Trung ương nào năm 1965 xác định quyết tâm kháng chiến chống Mỹ trên phạm vi cả nước?', ['Hội nghị lần thứ 11 và 12', 'Hội nghị lần thứ 13 và 14', 'Hội nghị lần thứ 18 và 19', 'Hội nghị lần thứ 20 và 21'], 0, 'Hội nghị Trung ương lần thứ 11 (3–1965) và 12 (12–1965) xác định quyết tâm kháng chiến trên phạm vi cả nước.'],
    ['Trong cuộc kháng chiến, vai trò của miền Bắc được xác định như thế nào?', ['Tiền tuyến lớn', 'Hậu phương lớn', 'Khu vực trung lập', 'Chỉ làm nhiệm vụ ngoại giao'], 1, 'Miền Bắc là hậu phương lớn, vừa xây dựng và bảo vệ miền Bắc vừa chi viện cho tiền tuyến miền Nam.'],
    ['Cuộc Tổng tiến công và nổi dậy Tết Mậu Thân diễn ra năm nào?', ['1965', '1972', '1968', '1973'], 2, 'Tết Mậu Thân 1968 tạo bước ngoặt, góp phần làm phá sản chiến lược Chiến tranh cục bộ.'],
    ['Hiệp định về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam được ký tại Paris vào ngày nào?', ['30–4–1975', '27–1–1973', '2–9–1969', '10–3–1975'], 1, 'Hiệp định Paris được ký ngày 27–1–1973, tạo thời cơ quan trọng để giải phóng hoàn toàn miền Nam.'],
    ['Chiến dịch nào mở đầu cuộc Tổng tiến công và nổi dậy mùa Xuân 1975?', ['Chiến dịch Hồ Chí Minh', 'Chiến dịch Huế–Đà Nẵng', 'Chiến dịch Tây Nguyên', 'Chiến dịch Đường 9–Nam Lào'], 2, 'Cuộc Tổng tiến công mở đầu bằng Chiến dịch Tây Nguyên, với đòn tiến công Buôn Ma Thuột ngày 10–3–1975.']
  ].map(([question, options, answer, context], i) => ({ id: `q${i + 1}`, type: 'multiple-choice', question, options, answer, context }))
});
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const grid = Array.from({length:12}, (_, r) => Array.from({length:12}, (_, c) => letters[(r * 17 + c * 7 + r * c) % 26]));
const wordSpecs = [
  ['DOCLAP', 'ĐỘC LẬP', 'Mục tiêu dân tộc gắn liền với tự do và chủ quyền.', 0, 0, 0, 1],
  ['TUDO', 'TỰ DO', 'Giá trị đi cùng độc lập trong Lời kêu gọi ngày 17–7–1966.', 2, 1, 1, 0],
  ['THONGNHAT', 'THỐNG NHẤT', 'Khát vọng đưa hai miền về một đất nước.', 10, 1, 0, 1],
  ['HAUPHUONG', 'HẬU PHƯƠNG', 'Vai trò của miền Bắc đối với tiền tuyến lớn miền Nam.', 0, 11, 1, 0]
];
const keywords = wordSpecs.map(([text, word, clue, r, c, dr, dc], i) => {
  const cells = [...text].map((ch, k) => { const row=r+dr*k, col=c+dc*k; grid[row][col]=ch; return row*12+col; });
  return { id:`kw${i+1}`, word, clue, cells };
});
write('game2-matrix.json', {title:'Từ khóa kháng chiến', subtitle:'Tìm những từ khóa về mục tiêu và sức mạnh của cả nước', rounds:[{roundNumber:1, category:'Độc lập · Tự do · Thống nhất', quote:'Miền Nam là tiền tuyến lớn, miền Bắc là hậu phương lớn.', grid, keywords}]});
write('game3-crossword.json', {
  title:'Giải mã thống nhất', subtitle:'Từ các dấu mốc lịch sử, tìm địa điểm ký kết hiệp định hòa bình năm 1973', hiddenKeyword:'PARIS', hiddenKeywordColIndex:5,
  rows:[
    ['PHUOCLONG',0,'Tỉnh được giải phóng ngày 6–1–1975, tạo cơ sở đánh giá thời cơ chiến lược (9 chữ cái).','Bắt đầu bằng PHƯỚC…','Chiến thắng Phước Long là một đòn thăm dò chiến lược quan trọng.'],
    ['MAUTHAN',1,'Tên gọi của Tết gắn với cuộc Tổng tiến công và nổi dậy năm 1968 (7 chữ cái).','Tên năm âm lịch, bắt đầu bằng MẬU…','Tết Mậu Thân 1968 tạo bước ngoặt trong cuộc kháng chiến.'],
    ['TRUONGSON',1,'Dãy núi gắn với tuyến đường chiến lược chi viện từ Bắc vào Nam (9 chữ cái).','Bắt đầu bằng TRƯỜNG…','Tuyến đường Trường Sơn giữ vai trò quan trọng trong chi viện chiến trường.'],
    ['HOCHIMINH',4,'Tên chiến dịch bắt đầu ngày 26–4–1975 để giải phóng Sài Gòn–Gia Định (9 chữ cái).','Chiến dịch mang tên Chủ tịch nước Việt Nam Dân chủ Cộng hòa đầu tiên.','Chiến dịch Hồ Chí Minh mở màn ngày 26–4 và giành thắng lợi ngày 30–4–1975.'],
    ['SAIGON',0,'Thành phố được giải phóng ngày 30–4–1975, tên gọi tại thời điểm đó (6 chữ cái).','Gồm hai tiếng, bắt đầu bằng SÀI…','Sài Gòn được giải phóng; cờ chiến thắng được cắm trên dinh Độc Lập lúc 11 giờ 30 phút.']
  ].map(([answer,highlightCol,clue,hint,context],rowIndex)=>({id:`row-${rowIndex}`,rowIndex,answer,highlightCol,clue,hint,context}))
});
const stations = [
  {title:'Quyết tâm chiến lược', short:'1965', kicker:'Mục tiêu chiến lược được xác định trong năm 1965 là gì?', options:['Bảo vệ miền Bắc, giải phóng miền Nam, tiến tới thống nhất','Ngừng chi viện cho miền Nam','Chỉ phát triển kinh tế trong hòa bình','Từ bỏ đấu tranh ngoại giao'], answer:0, hint:'Gắn nhiệm vụ của hai miền với mục tiêu chung của cả nước.', context:'Hai nhiệm vụ bảo vệ miền Bắc và giải phóng miền Nam gắn bó mật thiết.'},
  {title:'Hậu phương lớn', short:'MIỀN BẮC', kicker:'Nhiệm vụ nào thuộc vai trò hậu phương miền Bắc?', options:['Chỉ tập trung vào thương lượng','Vừa sản xuất, vừa chiến đấu và chi viện miền Nam','Dừng xây dựng kinh tế','Tách rời nhiệm vụ miền Nam'], answer:1, hint:'Nhiệm vụ kinh tế, quốc phòng và chi viện được thực hiện đồng thời.',context:'Miền Bắc chuyển hướng kinh tế, bảo vệ hậu phương và chi viện tiền tuyến.'},
  {title:'Bước ngoặt Mậu Thân', short:'1968', kicker:'Sau bước ngoặt Mậu Thân 1968, Mỹ phải chấp nhận điều gì?', options:['Rút toàn bộ quân ngay trong tháng 1–1968','Ký Hiệp định Paris ngay năm 1968','Đàm phán tại Paris từ tháng 5–1968','Chấm dứt mọi hoạt động quân sự trên toàn thế giới'], answer:2,hint:'Bước chuyển diễn ra trên mặt trận ngoại giao.',context:'Đàm phán tại Paris bắt đầu từ tháng 5–1968; hiệp định được ký năm 1973.'},
  {title:'Ba mặt trận', short:'KẾT HỢP', type:'multi', kicker:'Chọn ba hình thức đấu tranh được kết hợp trong cuộc kháng chiến.', options:['Quân sự','Chính trị','Ngoại giao','Từ bỏ quyền tự quyết'], answers:[0,1,2],hint:'Ba mặt trận hỗ trợ lẫn nhau; không từ bỏ quyền tự quyết.', context:'Đấu tranh quân sự, chính trị và ngoại giao tạo sức mạnh tổng hợp.'},
  {title:'Hiệp định hòa bình', short:'1973', kicker:'Hiệp định Paris được ký vào ngày nào?',options:['27–1–1973','30–4–1975','8–3–1965','26–4–1975'], answer:0,hint:'Hiệp định được ký vào tháng 1 năm 1973.',context:'Ngày 27–1–1973, Hiệp định về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam được ký kết.'},
  {title:'Thời cơ chiến lược', short:'PHƯỚC LONG', kicker:'Chiến thắng Phước Long ngày 6–1–1975 có ý nghĩa gì?', options:['Kết thúc toàn bộ cuộc kháng chiến ngay lập tức','Làm cơ sở đánh giá thời cơ giải phóng hoàn toàn miền Nam','Mở đầu đàm phán Paris','Mở đầu cuộc chiến tranh phá hoại miền Bắc'],answer:1,hint:'Đây là một đòn thăm dò chiến lược.',context:'Chiến thắng củng cố nhận định về khả năng và thời cơ giải phóng hoàn toàn miền Nam.'},
  {title:'Những đòn tiến công', short:'XUÂN 1975', type:'order-two', kicker:'Điền hai địa danh theo thứ tự các chiến dịch mùa Xuân 1975.',template:'Mở đầu ở ___, tiếp đó phát triển thắng lợi tại ___ và Đà Nẵng.',tiles:['Huế','Tây Nguyên','Paris','Phước Long'],answers:[1,0],hint:'Chiến dịch mở đầu có trận Buôn Ma Thuột; Huế được giải phóng sau đó.',context:'Tây Nguyên mở đầu cuộc Tổng tiến công; tiếp đó là Huế–Đà Nẵng và Chiến dịch Hồ Chí Minh.'},
  {title:'Ngày toàn thắng',short:'30–4–1975',kicker:'Cờ chiến thắng được cắm trên dinh Độc Lập lúc nào ngày 30–4–1975?',options:['6 giờ sáng','9 giờ sáng','11 giờ 30 phút','18 giờ'],answer:2,hint:'Thời điểm vào gần giữa trưa.',context:'11 giờ 30 phút ngày 30–4–1975 là dấu mốc chiến thắng tại dinh Độc Lập.'}
].map((s,i)=>({id:`s${i+1}`,type:'single',...s,piece:[...'TOAN THANG'.replaceAll(' ','')][i]}));
write('game4-challenge.json',{title:'Đường tới toàn thắng',subtitle:'Vượt tám trạm để kết nối những dấu mốc của hành trình 1965–1975',finalCode:'TOÀN THẮNG',finalMessage:'Bạn đã hoàn thành hành trình từ quyết tâm kháng chiến năm 1965 đến thắng lợi mùa Xuân 1975. Hiểu quá khứ, trân trọng hòa bình và tiếp bước tương lai.',stations});
const matching=JSON.parse(fs.readFileSync(path.join(root,'be/data/game-data.json'),'utf8'));
matching.title='Nối cặp lịch sử';
matching.subtitle='Kết nối sự kiện và ý nghĩa lịch sử giai đoạn 1965–1975';
matching.source_note='Biên soạn theo SOURCE.md: Lãnh đạo cách mạng cả nước 1965–1975.';
matching.rounds=[{id:'round-lich-su',order:1,category:'Dấu mốc 1965–1975',instruction:'Nối mỗi sự kiện với thời điểm tương ứng.',source:'SOURCE.md',pairs:[['Hội nghị Trung ương 11 và 12','Năm 1965'],['Tổng tiến công và nổi dậy Mậu Thân','Năm 1968'],['Ký kết Hiệp định Paris','27–1–1973'],['Giải phóng Sài Gòn','30–4–1975']].map(([left,right],i)=>({id:`history-p${i}`,left,right,explain:`${left}: ${right}.`}))}];
write('game-data.json',matching);
const copyReplacements = new Map([
  ['Vượt qua 8 trạm để xây một tổ ấm hoàn chỉnh — mỗi câu đúng nhận một mảnh ghép mật mã','Vượt tám trạm kiến thức để kết nối hành trình lịch sử 1965–1975'],
  ['Tổ ấm đã hoàn thành!','Hành trình đã hoàn thành!'],
  ['Phòng chờ gia đình','Phòng chờ thử thách'],
  ['Hãy chuẩn bị cùng người thân bước vào những trò chơi gắn kết và đầy yêu thương.','Khám phá lịch sử 1965–1975 qua bốn thử thách kiến thức.'],
  ['Cùng nhau khám phá những giá trị yêu thương, truyền thống và ký ức gia đình Việt Nam qua từng thử thách thú vị.','Khám phá đường lối kháng chiến, những bước ngoặt và hành trình thống nhất đất nước 1965–1975.'],
  ['những giá trị gia đình Việt Nam','lịch sử Việt Nam giai đoạn 1965–1975'],
  ['Mỗi gia đình là một câu chuyện, mỗi thế hệ là một chương mới','Hiểu quá khứ · Trân trọng hòa bình · Tiếp bước tương lai'],
  ['cơ sở hình thành gia đình','mục tiêu và sức mạnh của cuộc kháng chiến'],
  ['Di sản Hồ Chí Minh','Tự Hào Việt'],
  ['Xây Tổ Ấm Việt','Đường tới toàn thắng'],
  ['Trò chơi gia đình','Nối cặp lịch sử'],
  ['<strong>"TẾ BÀO"</strong> — "Gia đình là tế bào của xã hội"!','<strong>"PARIS"</strong> — nơi ký kết hiệp định hòa bình năm 1973!'],
  ['#D8443E','#AE151B'],['#E86B5C','#C52325'],['#B8342E','#830D13'],['#9A2E28','#8F1017'],['#FEF7F4','#FCF7ED'],['#FBE0DB','#F8E6DC'],['#CEAA28','#B88729'],['#F6EBBE','#FAE9B7'],['#4E8F5B','#9C671E'],['#33693F','#704811'],['#DDEAD3','#F8EDCC']
]);
for (const name of fs.readdirSync(path.join(root,'fe'))) {
  const file=path.join(root,'fe',name);
  if(!fs.statSync(file).isFile() || !/\.(html|css|js)$/.test(name) || name==='source.html') continue;
  let text=fs.readFileSync(file,'utf8');
  for(const [before,after] of copyReplacements) text=text.replaceAll(before,after);
  if(name.endsWith('.html')) {
    const titleByFile={'quiz.html':'Dấu mốc lịch sử','matrix.html':'Từ khóa kháng chiến','crossword.html':'Giải mã thống nhất','challenge.html':'Đường tới toàn thắng'};
    if(titleByFile[name]) text=text.replace(/Game [1-4]/g,titleByFile[name]);
  }
  fs.writeFileSync(file,text);
}
// Keep both static roots aligned: the backend prefers be/public when it exists.
for (const name of fs.readdirSync(path.join(root,'fe'))) {
  const from=path.join(root,'fe',name);
  if(fs.statSync(from).isFile() && name.endsWith('.html') && name!=='index.html') {
    let html=fs.readFileSync(from,'utf8');
    html=html.replace(/Gia Đình Việt|GIA ĐÌNH VIỆT|Gia đình Việt|VIETFAMILY|VietFamily/g,'Tự Hào Việt');
    if(!html.includes('href="/tuhaoviet.css"')) html=html.replace('</head>','<link rel="stylesheet" href="/tuhaoviet.css">\n</head>');
    if(name==='lobby.html') {
      const descriptions=['Trả lời 5 câu hỏi về đường lối kháng chiến và những dấu mốc 1965–1975.','Giải các hàng ngang lịch sử để tìm địa điểm ký kết hiệp định hòa bình năm 1973.','Vượt tám trạm về quyết sách chiến lược, sự kiện và hành trình tới mùa Xuân 1975.'];
      let i=0; html=html.replace(/(<p class="game-card__desc">)[\s\S]*?(<\/p>)/g,(_,a,b)=>a+descriptions[i++]+b);
      ['Dấu mốc lịch sử','Giải mã thống nhất','Đường tới toàn thắng'].forEach((title,i)=>{html=html.replace(`class="game-card__name">Game ${i+1}`,`class="game-card__name">${title}`);});
    }
    fs.writeFileSync(from,html);
  }
}
fs.cpSync(path.join(root,'fe'),path.join(root,'be/public'),{recursive:true});
console.log('Updated four game datasets, shared branding, and both frontend roots.');
