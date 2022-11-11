function ListItem(){
    this.arr = []
    this.addItem = (item) =>{
        this.arr.push(item)
    }
    this.replaceList = (_list) =>{
        this.arr = _list
    }
    this.deleteItem = (id,size)=>{
        var index = this.findIndexItem(id,size);
        this.arr.splice(index,1)
    }
    this.clearArr = ()=>{
        this.arr = [];
    }
    this.findIndexItem =(id,size) =>{
        return this.arr.findIndex(shoe =>(shoe.id == id && shoe.sizes == size))
    }
    this.checkDuplicateItem = (item)=>{
        return this.arr.some(shoe=>(shoe.id == item.id && shoe.sizes == item.sizes))
    }
    this.updateQuantityItem = (item,value)=>{ 
        var index = this.arr.findIndex(shoe =>(shoe.id == item.id && shoe.sizes == item.sizes))
        this.arr[index].quantity = value;
    }
    this.getQuantityItem = (item)=>{ 
        var index = this.arr.findIndex(shoe =>(shoe.id == item.id && shoe.sizes == item.sizes))
        console.log('index:',index);
        return this.arr[index].quantity;
    }
}

