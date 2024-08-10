import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const HomeDogCard = (props: any) => {
    const { dogInfo } = props

    return (
        <Card sx={{ width: "100%" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={dogInfo.image ? dogInfo.image : "/assets/img/no-image.png"}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {dogInfo.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        Data: {new Date(dogInfo.created).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {dogInfo.text}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default HomeDogCard