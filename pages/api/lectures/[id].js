import fs from 'fs';
import path from 'path';

// JSON 파일의 경로
const lecturesFilePath = path.join(process.cwd(), 'fake-data', 'lectures.json');

export default function handler(req, res) {
    // JSON 파일을 불러와서 파싱
    const lectureData = JSON.parse(fs.readFileSync(lecturesFilePath, 'utf8'));

    if (req.method === 'GET') {
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
    } else if (req.method === 'DELETE') {
        const { id } = req.query;

        const lectureIndex = lectureData.findIndex(lecture => lecture.id === Number(id));

        if (lectureIndex > -1) {
            // 강의를 삭제
            lectureData.splice(lectureIndex, 1);

            // 파일을 업데이트
            fs.writeFileSync(lecturesFilePath, JSON.stringify(lectureData, null, 4));
            res.status(200).json({ message: 'Lecture deleted successfully' });
        } else {
            res.status(404).json({ message: 'Lecture not found' });
        }
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const updatedLecture = req.body;

        const lectureIndex = lectureData.findIndex(lecture => lecture.id === Number(id));

        if (lectureIndex === -1) {
            // 강의 정보가 없으면 에러 메시지를 클라이언트로 전송
            res.status(404).json({ message: 'Lecture not found' });
        } else {
            // 기존 강의 정보를 업데이트
            lectureData[lectureIndex] = { ...lectureData[lectureIndex], ...updatedLecture };

            // 배열을 다시 JSON 파일로 저장
            fs.writeFileSync(lecturesFilePath, JSON.stringify(lectureData, null, 4));

            // 클라이언트에게 응답
            res.status(200).json({ message: 'Lecture updated successfully!', updatedLecture: lectureData[lectureIndex] });
        }
    } // else if for other methods
}
