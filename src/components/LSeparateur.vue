<template>
  <div class="d-flex justify-content-around my-5 text-center">
    <div class="barre w-25"/>
    <div>
      <h2 class="h1-lemka">{{ titre }}</h2>
      <small class="text-muted"><i>{{ sousTitre.toUpperCase() }}</i></small>
    </div>
    <div class="barre w-25"/>
  </div>
</template>

<script>
export default {
  name: 'l-separateur',
  props : {
    titre: {
      type: String,
      default: 'LEMKA - Atelier de couture'
    },
    sousTitre: {
      type: String,
      default: 'LOREM IPSUM DOLOR SITE CONSECTETUER'
    }
  }
}
</script>

<style scoped>

.barre {
  border-top: 5px solid #79648F;
  margin-top: 25px;
  margin-bottom: 15px;
  border-bottom: 1px dotted #B4A8BF;
}

</style>