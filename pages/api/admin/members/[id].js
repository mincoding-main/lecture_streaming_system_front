import fs from 'fs';
import path from 'path';

// JSON 파일의 경로
const membersFilePath = path.join(process.cwd(), 'fake-data', 'members.json');

export default function handler(req, res) {
    if (req.method === 'GET') {
        // 동적 라우팅에서 전달된 아이디 값을 가져옴
        const { id } = req.query;
        const memberData = JSON.parse(fs.readFileSync(membersFilePath, 'utf8'));
        const member = memberData.find((member) => member.id === Number(id));

        if (member) {
            res.status(200).json(member);
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const { employeeId, password, isAdmin, lectureId, isDeleted } = req.body;
        const memberData = JSON.parse(fs.readFileSync(membersFilePath, 'utf8'));
        const memberIndex = memberData.findIndex((member) => member.id === Number(id));

        if (memberIndex !== -1) {
            memberData[memberIndex].employeeId = employeeId;
            memberData[memberIndex].isAdmin = isAdmin;
            memberData[memberIndex].isDeleted = isDeleted;
            if (Array.isArray(lectureId)) {
                memberData[memberIndex].lectureId = lectureId;
            }

            if (password && password.trim() !== '') {
                memberData[memberIndex].password = password;
            }

            fs.writeFileSync(membersFilePath, JSON.stringify(memberData, null, 4), 'utf8');
            res.status(200).json({ message: 'Member profile updated successfully' });
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        const { permanent } = req.body;  // 물리적 삭제를 할지 여부
        const memberData = JSON.parse(fs.readFileSync(membersFilePath, 'utf8'));
        const memberIndex = memberData.findIndex((member) => member.id === Number(id));

        if (memberIndex !== -1) {
            memberData.splice(memberIndex, 1);
            res.status(200).json({ message: 'Member permanently deleted' });

            fs.writeFileSync(membersFilePath, JSON.stringify(memberData, null, 2), 'utf8');
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
