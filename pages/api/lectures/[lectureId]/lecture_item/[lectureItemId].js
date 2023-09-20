import fs from 'fs';
import path from 'path';

const lecturesFilePath = path.join(process.cwd(), 'fake-data', 'lectures.json');

export default function handler(req, res) {
    const lectures = JSON.parse(fs.readFileSync(lecturesFilePath, 'utf8'));
    const { lectureId, lectureItemId } = req.query;
    console.log(req.query)
    if (req.method === 'GET') {
        const lecture = lectures.find(lecture => lecture.id === Number(lectureId));
        if (lecture) {
            const video = lecture.videos.find(video => video.id === Number(lectureItemId));
            if (video) {
                res.status(200).json(video);
            } else {
                res.status(404).json({ message: 'Video not found' });
            }
        } else {
            res.status(404).json({ message: 'Lecture not found' });
        }
    } else if (req.method === 'PATCH') {
        // Updating an existing video
        const updateData = req.body;
        const lecture = lectures.find(lecture => lecture.id === Number(lectureId));
        if (lecture) {
            const video = lecture.videos.find(video => video.id === Number(lectureItemId));
            if (video) {
                Object.assign(video, updateData);
                fs.writeFileSync(lecturesFilePath, JSON.stringify(lectures, null, 4));
                res.status(200).json({ message: 'Video updated', video });
            } else {
                res.status(404).json({ message: 'Video not found' });
            }
        } else {
            res.status(404).json({ message: 'Lecture not found' });
        }
    } else if (req.method === 'DELETE') {
        // Deleting an existing video
        const lecture = lectures.find(lecture => lecture.id === Number(lectureId));
        if (lecture) {
            const videoIndex = lecture.videos.findIndex(video => video.id === Number(lectureItemId));
            if (videoIndex > -1) {
                lecture.videos.splice(videoIndex, 1);
                fs.writeFileSync(lecturesFilePath, JSON.stringify(lectures, null, 4));
                res.status(200).json({ message: 'Video deleted' });
            } else {
                res.status(404).json({ message: 'Video not found' });
            }
        } else {
            res.status(404).json({ message: 'Lecture not found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
