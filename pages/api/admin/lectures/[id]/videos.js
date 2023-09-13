import fs from 'fs';
import path from 'path';

const lecturesFilePath = path.join(process.cwd(), 'fake-data', 'lectures.json');

export default function handler(req, res) {
    const lectures = JSON.parse(fs.readFileSync(lecturesFilePath, 'utf8'));

    if (req.method === 'POST') {
        const newVideo = req.body;
        const lecture = lectures.find(lecture => lecture.id === Number(req.query.id));

        if (lecture) {
            const maxVideoId = Math.max(...lecture.videos.map(video => video.id), 0);
            const newVideoId = maxVideoId + 1;

            newVideo.id = newVideoId;

            // id를 맨 위로 올리기
            const reorderedVideo = { id: newVideo.id, ...newVideo };

            lecture.videos.push(reorderedVideo);

            fs.writeFileSync(lecturesFilePath, JSON.stringify(lectures, null, 4));
            res.status(201).json({ message: 'Video added', video: reorderedVideo });
        } else {
            res.status(404).json({ message: 'Lecture not found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
