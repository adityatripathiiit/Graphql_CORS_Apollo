const express =  require('express');

const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const connectionFactory = require('./db/mongoose.js');
const cors = require('cors');



connectionFactory();

const app = express();

app.use(cors());
app.use("/graphql",graphqlHTTP({
    schema:schema,
    graphiql: true
}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log(`listening on the port ${PORT}`)});
