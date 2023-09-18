import fs from 'fs';
import path from 'path';

// JSON 파일의 경로
const tagsFilePath = path.join(process.cwd(), 'fake-data', 'tags.json');

export default function handler(req, res) {
    if (req.method === 'GET') {
        // 동적 라우팅에서 전달된 아이디 값을 가져옴
        const { id } = req.query;
        const tagData = JSON.parse(fs.readFileSync(tagsFilePath, 'utf8'));
        const tag = tagData.find((tag) => tag.id === Number(id));

        if (tag) {
            res.status(200).json(tag);
        } else {
            res.status(404).json({ message: 'tag not found' });
        }
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const { name } = req.body;
        const tagData = JSON.parse(fs.readFileSync(tagsFilePath, 'utf8'));
        const tagIndex = tagData.findIndex((tag) => tag.id === Number(id));

        if (tagIndex !== -1) {
            tagData[tagIndex].name = name;

            fs.writeFileSync(tagsFilePath, JSON.stringify(tagData, null, 4), 'utf8');
            res.status(200).json({ message: 'tag profile updated successfully' });
        } else {
            res.status(404).json({ message: 'tag not found' });
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        const tagData = JSON.parse(fs.readFileSync(tagsFilePath, 'utf8'));
        const tagIndex = tagData.findIndex((tag) => tag.id === Number(id));

        if (tagIndex !== -1) {
            tagData.splice(tagIndex, 1);
            res.status(200).json({ message: 'tag permanently deleted' });

            fs.writeFileSync(tagsFilePath, JSON.stringify(tagData, null, 2), 'utf8');
        } else {
            res.status(404).json({ message: 'tag not found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
