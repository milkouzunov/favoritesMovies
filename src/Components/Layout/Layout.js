import {Link} from 'react-router-dom';
import styles from './Layout.module.css';

import {
    Button,
    Container,
    Header,
    Icon,
  } from 'semantic-ui-react';


const Layout = () => (
    <Container 
    text
    style= {{
        backgroundImage: `url(${"./home.jpg"})`,
        backgroundSize: 'cover',
        width: '100vw',
        fontWeight: 'normal',
        marginTop: '0',
        paddingTop: '1em',
        paddingBottom: '50em',
    }}
    >
      <Header
        as='h1'
        content='The Cinemates'
        inverted
        style={{
          fontSize: '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          width: '100vw',
          marginTop: '3em',
          color: 'white'
        }}
      />
      <Button 
      as={Link}  
      primary size='large'
      className={styles.button}
      to='/search'
       >
        Search
        <Icon name='right arrow' />
      </Button>
    </Container>
  );

export default Layout;

