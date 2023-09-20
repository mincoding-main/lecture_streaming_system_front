import fs from 'fs';
import path from 'path';

// JSON 파일의 경로
const membersFilePath = path.join(process.cwd(), 'fake-data', 'members.json');

export default function handler(req, res) {
    if (req.method === 'GET') {
        // 동적 라우팅에서 전달된 아이디 값을 가져옴
        const { id } = req.query;

        // JSON 파일을 불러와서 파싱
        const memberData = JSON.parse(fs.readFileSync(membersFilePath, 'utf8'));

        // 해당 아이디를 가진 사용자 정보를 찾음
        const member = memberData.find((member) => member.id === Number(id));
        if (member) {
            // 사용자 정보가 있으면 해당 정보를 클라이언트로 전송
            res.status(200).json(member);
        } else {
            // 사용자 정보가 없으면 에러 메시지를 클라이언트로 전송
            res.status(404).json({ message: 'member not found' });
        }
    } else if (req.method === 'PATCH') {
        const { id } = req.query;
        const { email, employeeId, password, isAdmin, lectureId, isDeleted } = req.body;
        const memberData = JSON.parse(fs.readFileSync(membersFilePath, 'utf8'));
        const memberIndex = memberData.findIndex((member) => member.id === Number(id));

        if (memberIndex !== -1) {
            if (email !== undefined && email !== null && email.trim() !== '') { // email 처리 추가
                memberData[memberIndex].email = email;
            }
            if (employeeId !== undefined && employeeId !== null) {
                memberData[memberIndex].employeeId = employeeId;
            }

            if (isAdmin !== undefined && isAdmin !== null) {
                memberData[memberIndex].isAdmin = isAdmin;
            }

            if (isDeleted !== undefined && isDeleted !== null) {
                memberData[memberIndex].isDeleted = isDeleted;
            }

            if (Array.isArray(lectureId)) {
                memberData[memberIndex].lectureId = lectureId;
            }

            if (password !== undefined && password !== null && password.trim() !== '') {
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
        // 지원하지 않는 메서드일 경우 에러 메시지를 클라이언트로 전송
        res.status(405).json({ message: 'Method not allowed' });
    }
}
