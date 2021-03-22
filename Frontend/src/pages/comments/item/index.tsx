import React, { MouseEventHandler } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

interface Props {
  body: string;
  ctas?: CtaProps[];
  title: string;
  date: string;
}

export interface CtaProps {
  icon: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Item: React.FC<Props> = ({ ctas, body, date, title, ...rest }) => {
  return (
    <Card style={{ textAlign: "left", overflow: "initial" }} {...rest}>
      <CardHeader title={title} subheader={date} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
      </CardContent>
      {ctas && (
        <CardActions disableSpacing>
          {ctas.map((c, i) => (
            <IconButton key={i} onClick={c.onClick}>
              {c.icon}
            </IconButton>
          ))}
        </CardActions>
      )}
    </Card>
  );
};

export default Item;
