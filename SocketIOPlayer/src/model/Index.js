class Index {
  constructor (timestamp, grid, offset, length) {
    this.timestamp = timestamp;
    this.grid = grid;
    this.offset = offset;
    this.length = length;  
  }
  row() {
    return this.grid >> 4;
  }
  col() {
    return this.grid & 0xf;
  }
}

export default Index;