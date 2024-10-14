import mysql from 'mysql2'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'


const app = express()


app.use(bodyParser.json())

app.use(cors());

const db  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'exam_sys'
});


db.connect((err)=> {
    if(err){
        console.error('database connect failed: ', err.stack );
        return;
    }
    console.log('connection successful');
    
});

app.get('/',(req,res)=>{
    const result =  db.query("SELECT * FROM STUDENT")
    console.log(result)
})

app.post('/login',(req,res)=>{
    const {phone} = req.body;
    const query = "SELECT * FROM STUDENT WHERE PHONE = ?";
    db.query(query,[phone],(err,results)=>{
        if(err){
            res.status(500).json({success: false, message:"error during login"});
            return 
        }
        if (results.length > 0) {
            res.json({ success: true, student_id: results[0].student_id });
        } else {
            res.json({ success: false, message: 'Phone number not found' });
        }
    })
});

app.post('/submit-result', (req, res) => {
    const { student_id, score } = req.body;

    if(!student_id || score== undefined){
        return res.status(400).json({message:"missing student ID or score"});
    }
    const dateTaken = new Date().toISOString().split('T')[0]; // Current date

    const query = 'INSERT INTO result (student_id, score, date_taken) VALUES (?, ?, ?)';
    db.query(query, [student_id, score, dateTaken], (error, results) => {
        if (error) {
            res.status(500).json({ success: false, message: 'Error storing result' });
            return;
        }
        else{
            res.json({ success: true, message: 'Result stored successfully' });
        }
    });

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
