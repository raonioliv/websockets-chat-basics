import { serverHttp } from "./http";
import './websocket'
serverHttp.listen(3000, () => console.log('Server started on PORT 3000 \n >> http://localhost:3000'))
