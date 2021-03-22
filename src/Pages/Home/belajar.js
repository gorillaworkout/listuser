var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango","semangka","duren","pisang","coklat",'susu','kamu',"Banana", "Orange", "Lemon", "Apple", "Mango","semangka","duren","pisang","coklat",'susu','kamu'];
var simpan=[]
var angkaAwal=18;
var angkamaks =22 
for(var i=angkaAwal; i<fruits.length; i++){
    if(i<angkamaks){
        simpan.push(fruits[i])
    }
    // console.log(i)
}
console.log(simpan)

