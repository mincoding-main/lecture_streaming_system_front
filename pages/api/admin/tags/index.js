import fs from 'fs';
import path from 'path';

// JSON 파일의 경로
const tagsFilePath = path.join(process.cwd(), 'fake-data', 'tags.json');

export default function handler(req, res) {
    if (req.method === 'GET') {
        // JSON 파일을 불러와서 파싱
        const tagData = JSON.parse(fs.readFileSync(tagsFilePath, 'utf8'));

        // 불러온 사용자 데이터를 클라이언트로 전송 (여기서는 단순히 응답으로 보냄)
        res.status(200).json(tagData);
    } else if (req.method === 'POST') {
        try {
            // POST 요청의 경우 새로운 사용자 데이터를 받아옴
            const { subject } = req.body;
            // 기존 사용자 데이터를 불러와서 파싱
            const tagData = JSON.parse(fs.readFileSync(tagsFilePath, 'utf8'));

            // 새로운 사용자 객체 생성
            const newtag = {
                id: tagData.length + 1,
                subject: subject
            };

            // 새로운 사용자 정보를 기존 사용자 데이터에 추가
            tagData.push(newtag);

            // 수정된 사용자 데이터를 다시 JSON 형태로 변환
            const updatedtagData = JSON.stringify(tagData, null, 4);

            // 사용자 데이터를 파일에 쓰기
            fs.writeFileSync(tagsFilePath, updatedtagData);

            // 새로운 사용자 정보를 클라이언트로 전송
            res.status(201).json(newtag);
        } catch (error) {
            // 에러가 발생한 경우 에러 메시지를 클라이언트로 전송
            res.status(500).json({ message: 'Failed to add new tag' });
        }
    }
}
