import fs from 'fs';
import path from 'path';

// JSON 파일의 경로
const usersFilePath = path.join(process.cwd(), 'fake-data', 'members.json');

export default function handler(req, res) {
    if (req.method === 'GET') {
        // 동적 라우팅에서 전달된 아이디 값을 가져옴
        const { id } = req.query;
        const userData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
        const user = userData.find((user) => user.id === Number(id));

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const { employeeId, password, isAdmin, lectureId, isDeleted } = req.body;
        const userData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
        const userIndex = userData.findIndex((user) => user.id === Number(id));

        if (userIndex !== -1) {
            userData[userIndex].employeeId = employeeId;
            userData[userIndex].isAdmin = isAdmin;
            userData[userIndex].isDeleted = isDeleted;
            if (Array.isArray(lectureId)) {
                userData[userIndex].lectureId = lectureId;
            }

            if (password && password.trim() !== '') {
                userData[userIndex].password = password;
            }

            fs.writeFileSync(usersFilePath, JSON.stringify(userData, null, 4), 'utf8');
            res.status(200).json({ message: 'User profile updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        const { permanent } = req.body;  // 물리적 삭제를 할지 여부
        const userData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
        const userIndex = userData.findIndex((user) => user.id === Number(id));

        if (userIndex !== -1) {
            userData.splice(userIndex, 1);
            res.status(200).json({ message: 'User permanently deleted' });

            fs.writeFileSync(usersFilePath, JSON.stringify(userData, null, 2), 'utf8');
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
