
interface TypeColor {
    [key:string]:string;
}


//register 할 때 세팅하는 값
export const matchedColor:{name:string, type:string, color:string, fullName:string}[]=[
    {name:'Admin', type:'admin', color:'black', fullName:'Admin'},
    {name:'Dev', type:'dev', color:'#21A2FF', fullName:'Developer'},
    {name:'PL', type:'pl', color:'#FF9E59', fullName:'Project Leader'},
    {name:'Tester', type:'test', color:'#4BDD62', fullName:'Tester'}
]


//typeColor 객체 정의
export const typeColor: TypeColor = {
    Admin: 'black',
    Dev: '#21A2FF',
    PL: '#FF9E59',
    Tester: '#4BDD62',
};



