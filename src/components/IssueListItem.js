import React from "react";
import PropTypes from "prop-types";
import compose from 'recompose/compose';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/ModeCommentOutlined';
import ListItem from '@material-ui/core/ListItem';
import { Chip } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { IssueState } from "../constants";
import TimeAgo from "./TimeAgo";
import IssueStateIcon from "./IssueStateIcon";
import { Span, withSkeletonProvider, withSkeleton, placeholder } from "./Skeleton";

const styles = theme => ({
  root: {
    '&.loading': {
      // remove mouse interactions when loading
      pointerEvents: 'none',
    },
  },
  commentIcon: {
    height: 18,
    width: 18,
    color: theme.palette.text.secondary,
    marginRight: theme.spacing.unit / 2,
  },
  listItemIcon: {
    marginRight: 0,
  },
});

// skeleton icons
const Comment = withSkeleton(CommentIcon);
const StateIcon = withSkeleton(IssueStateIcon);

const IssueListItem = ({ classes, title, number, createdAt, state, author, commentCount, loading, repository, labels, ...other }) => {
  
  const labelChips = labels.map(label => <Chip size="small" label={label.name} style={{height: '24px', background: `${label.color}`}} variant="outlined" />);
  return (
  <ListItem className={cx(classes.root, { loading })} button {...other}>
    <ListItemIcon className={classes.listItemIcon}>
      <StateIcon state={state} />
    </ListItemIcon>
    <ListItemText
      disableTypography
      primary={
        <div>
          {repository !=='' && <Typography variant="caption" noWrap color="textSecondary">
            <Span>{repository} #{number}</Span>
          </Typography>}
          <Typography variant="subtitle1" noWrap>
            <Span>{title}</Span>
          </Typography>
        </div>
      }
      secondary={
        <Typography variant="caption" noWrap color="textSecondary">
          <Span>#{number} opened <TimeAgo date={createdAt} /> by {author} {labelChips}</Span>
        </Typography>
      }
    />
    {(loading || commentCount > 0) && (
      <ListItemIcon className={classes.listItemIcon}>
        <>
          <Comment className={classes.commentIcon} />
          <Typography variant="caption">{commentCount}</Typography>
        </>
      </ListItemIcon>
    )}
  </ListItem>
)};

IssueListItem.propTypes = {
  title: PropTypes.string,
  number: PropTypes.number,
  state: PropTypes.oneOf([IssueState.OPEN, IssueState.CLOSED]),
  author: PropTypes.string,
  createdAt: PropTypes.string,
  commentCount: PropTypes.number,
  tabIndex: PropTypes.number,
  loading: PropTypes.bool,
  repository: PropTypes.string,
  labels: PropTypes.array,
};

IssueListItem.defaultProps = {
  author: 'unknown',
  repository: '',
  labels: []
};

export default compose(
  withSkeletonProvider({
    title: placeholder(50),
    author: placeholder(10),
    state: null,
  }),
  withStyles(styles),
)(IssueListItem);
