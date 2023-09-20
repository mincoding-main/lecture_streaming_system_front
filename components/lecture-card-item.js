// LectureListCard.jsx
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import utilStyles from '../styles/utils.module.css';

export default function LectureListCard({ lectureData }) {
    return (
        <div className={utilStyles.cardList}>
            {lectureData.map((lecture) => (
                <Card key={lecture.id} sx={{ width: 250, marginLeft: '2rem', marginBottom: '2rem' }}>
                    <CardActionArea
                        component="a" // 클릭 시 a 태그로 동작하도록 설정
                        href={`/lecture/lecture-detail/${lecture.id}`} // 해당 강의의 링크 URL을 데이터베이스에서 가져온 값으로 설정
                        rel="noopener noreferrer" // 보안을 위해 추가 
                    >
                        <CardMedia
                            component="img"
                            height="140"
                            image={lecture.img} // 이미지 URL을 데이터베이스에서 가져온 값으로 설정
                            alt={lecture.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {lecture.title} {/* 제목을 데이터베이스에서 가져온 값으로 설정 */}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {lecture.content} {/* 설명을 데이터베이스에서 가져온 값으로 설정 */}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
}
