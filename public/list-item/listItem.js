function ListItem() {
    this.arr = [];
    this.addItem = function (item) {
        this.arr.push(item)
    }
    this.replaceList = (listItem)=>{
        this.arr = listItem
    }
    this.findIndexItem = (id) => {
        return this.arr.findIndex(item =>
            item._id == id
        )
    }
    this.findListItemsByName = (text) => {
        return this.arr.filter(item =>
            item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0
        )
    }
    this.findListItemsByGender = (gender) => {
        return this.arr.filter(item =>
            item.gender.toLowerCase().indexOf(gender.toLowerCase()) >= 0
        )
    }
    this.findListItemsBySize = (size) => {
        return this.arr.filter(item =>
            item.sizes.some(itemSize =>
                itemSize.size.toLowerCase().indexOf(size.toLowerCase()) >= 0) == true
        )
    }
    this.findListItemByInfo = (info) => {
        switch (info.key) {
            case 'keyword':
                return this.findListItemsByName(info.value)
            case 'gender':
                return this.findListItemsByGender(info.value)
            case 'size':
                return this.findListItemsBySize(info.value)

            default:
                break;
        }
    }
    this.sortLowToHighPrice = ()=>{
        function compare( a, b ) {
            if ( a.price < b.price ){
              return -1;
            }
            if ( a.price > b.price ){
              return 1;
            }
            return 0;
          }
        this.arr = this.arr.sort(compare);
    }
    this.sortHighToLowPrice = ()=>{
        function compare( a, b ) {
            if ( a.price > b.price ){
              return -1;
            }
            if ( a.price < b.price ){
              return 1;
            }
            return 0;
          }
        this.arr = this.arr.sort(compare);
    }
}