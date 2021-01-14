import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PublicIcon from '@material-ui/icons/Public';
import LanguageIcon from '@material-ui/icons/Language';
import PieChartIcon from '@material-ui/icons/PieChart';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles({
  root: {
    marginTop: 30,
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0
  },
});

export default function SimpleBottomNavigation({ value }) {
  const classes = useStyles();
  return (
    <BottomNavigation
      value={value[0]}
      onChange={(event, newValue) => {
        value[1](newValue);
      }}
      showLabels
      className={classes.root}
    >
      <Tooltip title="World Data" arrow>
        <BottomNavigationAction label="World" icon={<PublicIcon />} />
      </Tooltip>

      <Tooltip title="Country-wise Data" arrow>
        <BottomNavigationAction label="Countries" icon={<LanguageIcon />} />
      </Tooltip>

      <Tooltip title="Report" arrow>
        <BottomNavigationAction label="Report" icon={<PieChartIcon />} />
      </Tooltip>

    </BottomNavigation>
  );
}
