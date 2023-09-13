import fs from 'fs';
import path from 'path';

// JSON 파일의 경로
const lecturesFilePath = path.join(process.cwd(), 'fake-data', 'lectures.json');

export default function handler(req, res) {
    if (req.method === 'GET') {
        // JSON 파일을 불러와서 파싱
        const lectureData = JSON.parse(fs.readFileSync(lecturesFilePath, 'utf8'));

        // 요청의 쿼리 파라미터에서 lectureIds를 가져옴
        const data = req.query;
        const lectureIds = data['lectureIds[]'];
        const lectureIdsArray = lectureIds ? lectureIds.map(Number) : [];
        if (Array.isArray(lectureIdsArray) && lectureIdsArray.length > 0) {
            // lectureIds가 배열 형태로 존재하는 경우, 해당하는 lecture 데이터를 필터링하여 가져옴
            const filteredLectures = lectureData.filter(lecture => lectureIdsArray.includes(lecture.id));

            // 필터링된 데이터를 클라이언트로 전송
            res.status(200).json(filteredLectures);
        } else {
            // lectureIds가 없거나 빈 배열인 경우, 모든 lecture 데이터를 가져옴
            res.status(200).json(lectureData);
        }
    } else if (req.method === 'POST') {
        // POST 요청 처리
    }
}