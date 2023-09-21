import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import mainStyles from '../styles/main/main.module.css';

export default function LectureListCard({ lectureData }) {
    return (
        <div className={mainStyles.cardList}>
            {lectureData.map((lecture) => (
                <Card key={lecture.id} className={mainStyles.cardItem}>
                    <CardActionArea
                        component="a"
                        href={`/lecture/lecture-detail/${lecture.id}`}
                        rel="noopener noreferrer" // 보안을 위해 추가 
                    >
                        <CardMedia
                            component="img"
                            image={lecture.img}
                            alt={lecture.title}
                            className={mainStyles.CardMedia}
                        />
                        <CardContent>
                            <Typography gutterBottom className={mainStyles.cardLectureTitle}>
                                {lecture.title}
                            </Typography>
                            <Typography className={mainStyles.cardLectureContent}>
                                {lecture.content}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
}
