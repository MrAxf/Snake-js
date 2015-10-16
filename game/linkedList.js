var Node = function(){
  this.element = null;
  this.next = null;
};

var LinkedList = function(){

  this.head = new Node();
  this.last = null;
  this.length = 0;
  this.curNode = this.head;

  this.add = function(element){
    addNode = new Node();
    addNode.element = element;
    addNode.next = this.curNode.next;
    this.curNode.next = addNode;
    if(addNode.next === null) this.last = addNode;
    this.curNode = addNode;
    this.length++;
  };

  this.delete = function(element){
    itNode = this.head;
    for(i = 0; i < this.length; i++ ){
      if(itNode.next.element.equals(element)){
        trash = itNode.next;
        if(trash.next === null) this.last = itNode;
        itNode.next = itNode.next.next;
        trash = null;
        this.length--;
        return true;
      }
      itNode = itNode.next;
    }
    return false;
  };

  this.getByIndex = function(index){
    if(index >= this.length || index < 0) return null;
    itNode = this.head;
    for(i = 0; i <= index; i++){
      itNode = itNode.next;
    }
    return itNode.element;
  };

};
