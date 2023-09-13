import fs from 'fs';
import path from 'path';

const lecturesFilePath = path.join(process.cwd(), 'fake-data', 'lectures.json');

export default function handler(req, res) {
    const lectureData = JSON.parse(fs.readFileSync(lecturesFilePath, 'utf8'));
    const { id, videoId } = req.query;

    const lecture = lectureData.find(lecture => lecture.id === Number(id));

    if (lecture) {
        const video = lecture.videos.find(video => video.id === Number(videoId));
        if (video) {
            res.status(200).json(video);
        } else {
            res.status(404).json({ message: 'Video not found' });
        }
    } else {
        res.status(404).json({ message: 'Lecture not found' });
    }
}
