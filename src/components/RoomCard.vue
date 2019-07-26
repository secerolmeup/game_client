<template>
  <div class="box-card">
    <div slot="header" class="clearfix">
      <p><span>{{room.name}}</span></p>
      <el-button
        @click="joinRoom(room.id)"
        style="float: right; padding: 3px 0"
        type="text"
      >Join Room</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomCard",
  props: ["room"],
  created() {
    console.log(this.room);
  }
};
</script>

<style>
.box-card{
  width: 180px;
  height: 150px;
  border: 3px solid brown;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* align-content: flex-end; */
  justify-content: space-around;
  margin: 20px;

}
</style>
