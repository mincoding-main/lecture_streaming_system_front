import fs from 'fs';
import path from 'path';

// JSON 파일의 경로
const lecturesFilePath = path.join(process.cwd(), 'fake-data', 'lectures.json');

export default function handler(req, res) {
    // JSON 파일을 불러와서 파싱
    const lectureData = JSON.parse(fs.readFileSync(lecturesFilePath, 'utf8'));

    if (req.method === 'GET') {
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
        const newLecture = req.body;
        console.log(req.body)

        // 새로운 강의의 ID를 생성 (가장 마지막 강의의 ID + 1)
        const newId = lectureData.length ? Math.max(...lectureData.map(lecture => lecture.id)) + 1 : 1;


        // 새로운 강의 객체를 생성
        const fullNewLecture = {
            id: newId,
            ...newLecture,
            img: "/test.png",
            courseContent: "#",
            videos: [],
        };

        // 새로운 강의를 배열에 추가
        lectureData.push(fullNewLecture);

        // 배열을 다시 JSON 파일로 저장
        fs.writeFileSync(lecturesFilePath, JSON.stringify(lectureData, null, 4));

        // 클라이언트에게 응답
        res.status(201).json({ message: 'Lecture created successfully!', fullNewLecture });

    }
}
