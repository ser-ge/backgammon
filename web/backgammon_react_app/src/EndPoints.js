const prod = {
    url: {
        NEW_GAME_URL: '/api/new_game',
        JOIN_GAME_URL: '/api/join_game?game_id=',
        SOCKET_URL: '/' ,
        HOME:'www.quickbackgammon.com',

    }
   };
   
   
const dev = {
    url: {
     NEW_GAME_URL: 'http://localhost:5000/api/new_game',
     JOIN_GAME_URL: 'http://localhost:5000/api/join_game?game_id=',
     SOCKET_URL: 'http://localhost:5000/',
     HOME: 'http://localhost:3000/',

    }
   };
   
export const config = process.env.NODE_ENV === "development" ? dev : prod;