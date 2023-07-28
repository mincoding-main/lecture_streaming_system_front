import fs from 'fs';
import path from 'path';

// JSON 파일의 경로
const usersFilePath = path.join(process.cwd(), 'fake-data', 'users.json');

export default function handler(req, res) {
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
}
