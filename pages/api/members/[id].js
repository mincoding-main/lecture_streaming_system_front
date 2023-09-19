import fs from 'fs';
import path from 'path';

// JSON 파일의 경로
const usersFilePath = path.join(process.cwd(), 'fake-data', 'members.json');

export default function handler(req, res) {
    if (req.method === 'GET') {
        // 동적 라우팅에서 전달된 아이디 값을 가져옴
        const { id } = req.query;

        // JSON 파일을 불러와서 파싱
        const userData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

        // 해당 아이디를 가진 사용자 정보를 찾음
        const user = userData.find((user) => user.id === Number(id));
        if (user) {
            // 사용자 정보가 있으면 해당 정보를 클라이언트로 전송
            res.status(200).json(user);
        } else {
            // 사용자 정보가 없으면 에러 메시지를 클라이언트로 전송
            res.status(404).json({ message: 'User not found' });
        }
    } else if (req.method === 'PUT') {
        // 동적 라우팅에서 전달된 아이디 값을 가져옴
        const { id } = req.query;

        // 요청 바디에서 업데이트할 데이터 추출
        const { employeeId, password } = req.body;

        // JSON 파일을 불러와서 파싱
        const userData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

        // 해당 아이디를 가진 사용자 정보를 찾음
        const userIndex = userData.findIndex((user) => user.id === Number(id));

        if (userIndex !== -1) {
            // 사용자 정보 업데이트
            userData[userIndex].employeeId = employeeId;
            userData[userIndex].password = password;

            // 업데이트된 사용자 정보를 파일에 저장
            fs.writeFileSync(usersFilePath, JSON.stringify(userData, null, 2), 'utf8');

            res.status(200).json({ message: 'User profile updated successfully' });
        } else {
            // 사용자 정보가 없으면 에러 메시지를 클라이언트로 전송
            res.status(404).json({ message: 'User not found' });
        }
    } else {
        // 지원하지 않는 메서드일 경우 에러 메시지를 클라이언트로 전송
        res.status(405).json({ message: 'Method not allowed' });
    }
}
