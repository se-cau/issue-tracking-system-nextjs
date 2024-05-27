
interface TypeColor {
    [key:string]:string;
}


//register 할 때 세팅하는 값
export const matchedColor:{name:string, type:string, color:string}[]=[
    {name:'Admin', type:'admin', color:'black'},
    {name:'DEV', type:'dev', color:'#21A2FF'},
    {name:'PL', type:'pl', color:'#FF9E59'},
    {name:'Tester', type:'test', color:'#4BDD62'}
]


//typeColor 객체 정의
export const typeColor: TypeColor = {
    Admin: 'black',
    Dev: '#21A2FF',
    Pl: '#FF9E59',
    Tester: '#4BDD62',
};



