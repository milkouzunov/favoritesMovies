import {AppBar, Container, Toolbar, Typography} from '@material-ui/core';

function Copyright() {
    return (
      <Typography variant="body2" color="white" align="center">
        {'Copyright © '}  
          The Cinemates
        {` ${new Date().getFullYear()}`}
        {'.'}
      </Typography>
    );
  }

export default function Footer() {
    return (
        <AppBar position="relative" style={{
            background: "rgb(1, 70, 127)",
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%'
            
        }}>
          <Container maxWidth="md">
            <Toolbar style={{
                justifyContent:"center"
            }} >
              <Copyright />
            </Toolbar>
          </Container>
        </AppBar>
    );
}