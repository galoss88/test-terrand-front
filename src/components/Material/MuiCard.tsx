import {
  Card,
  CardActions,
  CardActionsProps,
  CardContent,
  CardContentProps,
  CardMedia,
  CardMediaProps,
  CardProps,
  SxProps,
  Theme,
  Typography,
  TypographyProps,
} from "@mui/material";
import React, { ReactNode } from "react";

interface MuiCardProps extends Omit<CardProps, "component"> {
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

interface MuiCardMediaProps extends Omit<CardMediaProps, "component"> {
  alt?: string;
  height?: string | number;
  image: string;
  component?: React.ElementType;
}

interface MuiCardContentProps extends CardContentProps {
  children?: ReactNode;
}

interface MuiCardTitleProps extends Omit<TypographyProps, "component"> {
  children?: ReactNode;
}

interface MuiCardDescriptionProps extends TypographyProps {
  children?: ReactNode;
}

interface MuiCardActionsProps extends CardActionsProps {
  children?: ReactNode;
}

type MuiCardComposedComponent = React.FC<MuiCardProps> & {
  Media: React.FC<MuiCardMediaProps>;
  Content: React.FC<MuiCardContentProps>;
  Title: React.FC<MuiCardTitleProps>;
  Description: React.FC<MuiCardDescriptionProps>;
  Actions: React.FC<MuiCardActionsProps>;
};

const MuiCard: MuiCardComposedComponent = ({ children, sx, ...props }) => {
  return (
    <Card sx={{ maxWidth: 345, ...sx }} {...props}>
      {children}
    </Card>
  );
};

MuiCard.Media = ({
  alt,
  height = "140",
  image,
  component = "img",
  ...props
}: MuiCardMediaProps) => {
  return (
    <CardMedia
      component={component}
      alt={alt}
      height={height}
      image={image}
      {...props}
    />
  );
};

MuiCard.Content = ({ children, ...props }: MuiCardContentProps) => {
  return <CardContent {...props}>{children}</CardContent>;
};

MuiCard.Title = ({ children, ...props }: MuiCardTitleProps) => {
  return (
    <Typography gutterBottom variant="h5" {...props}>
      {children}
    </Typography>
  );
};

MuiCard.Description = ({ children, ...props }: MuiCardDescriptionProps) => {
  return (
    <Typography
      variant="body2"
      sx={{ color: "text.secondary", ...props.sx }}
      {...props}
    >
      {children}
    </Typography>
  );
};

MuiCard.Actions = ({ children, ...props }: MuiCardActionsProps) => {
  return <CardActions {...props}>{children}</CardActions>;
};

export { MuiCard };
