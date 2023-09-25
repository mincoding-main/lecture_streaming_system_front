import Link from 'next/link';
import config from '@/config';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import mainStyles from '../styles/main/main.module.css';

export default function LectureListCard({ lectureData }) {
    const baseURL = config.imageBaseURL
    return (
        <div className={mainStyles.cardList}>
            {lectureData.map((lecture) => (
                <Card key={lecture.id} className={mainStyles.cardItem}>
                    <Link href={`/lecture/lecture-detail/${lecture.id}`} passHref>
                        <CardActionArea rel="noopener noreferrer">
                            <CardMedia
                                component="img"
                                image={`${baseURL}/${lecture.img.image_name}`}
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
                    </Link>
                </Card>
            ))}
        </div>
    );
}
