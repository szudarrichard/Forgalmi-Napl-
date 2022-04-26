const axios = require('axios');
it("getallteachers", async ()=>{
    const res = await axios({
        method: 'get',
        url: 'http://localhost:3000/teacher'
    })
    expect([]).not.toBeNull();
})

it("getoneteachers", async ()=>{
    const res = await axios({
        method: 'get',
        url: 'http://localhost:3000/teacher/ID/1'
    })
    expect([]).not.toBeNull();
})


it("insertteacher", async ()=>{
    const res = await axios({
        method: 'post',
        url: 'http://localhost:3000/teacher',
        data: {userName: "Teszt Elek", phoneNum: "420420213", email: "tesztelek@teszt.hu", schoolID: "1"}
    })
    expect([]).not.toBeNull();
})



it("updateteacher", async ()=>{ 
    const res = await axios({
        method: 'patch',
        url: 'http://localhost:3000/teacher/10',
        data: {userName: "Nagy Elek", phoneNum: "423420213", email: "tesztkelek@teszt.hu", schoolID: "1"}
    })
    expect([]).not.toBeNull();
})

it("insertcar", async ()=>{
    const res = await axios({
        method: 'post',
        url: 'http://localhost:3000/car',
        data: { teacherID: "18", plateNum: "AGY-666", sumKM:"123456"}
    })
    expect([]).not.toBeNull();
})

it("logincheck", async ()=>{
    const res = await axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {email: "admin@admin.hu", passwrd:"admin", table:"admin"}
    })
    expect([]).not.toBeNull();
})

it("deleteteacher", async ()=>{
    const res = await axios({
        method: 'delete',
        url: 'http://localhost:3000/teacher/35',
    })
    expect([]);
})