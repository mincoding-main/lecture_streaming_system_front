import fs from 'fs';
import path from 'path';

// JSON 파일의 경로
const lecturesFilePath = path.join(process.cwd(), 'fake-data', 'lectures.json');

export default function handler(req, res) {
    if (req.method === 'GET') {
        // JSON 파일을 불러와서 파싱
        const lectureData = JSON.parse(fs.readFileSync(lecturesFilePath, 'utf8'));

        // 동적 라우팅에서 전달된 강의 id 값을 가져옴
        const { id } = req.query;

        // 해당 id를 가진 강의 정보를 찾음
        const lecture = lectureData.find(lecture => lecture.id === Number(id));

        if (lecture) {
            // 해당 강의 정보를 클라이언트로 전송
            res.status(200).json(lecture);
        } else {
            // 강의 정보가 없으면 에러 메시지를 클라이언트로 전송
            res.status(404).json({ message: 'Lecture not found' });
        }
    } else if (req.method === 'PUT') {
        // PUT 요청 처리
    }
}
