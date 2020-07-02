<template>
  <div>
    <div id="us">
      <ul>
        <li id="title">About us</li>
        <li>
          <p class="pcity">
            The company started in order to
            <b>increase the quality</b> of the
            presentations, and involve presential events participants as well as
            every user.
          </p>
        </li>
        <li>
          <p class="pcat">
            This is why all the presentations
            <b>are rated for our users</b>, whereas they enjoy the event or in any future moment, watching it. Along
            the way, through the voting system, the organizers can see which
            presentations get the best scores and use it to improve them and
            increase the level of the event.
          </p>
        </li>
        <li>
          <p class="pevent">
            We want to be the
            <b>reference company</b> in the world of events
            and conventions, helping to increase the quality of the
            presentations.
          </p>
        </li>
        <li class="icity"></li>
        <li class="icat"></li>
        <li class="ievent"></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "about"
};
</script>

<style scoped>
#us {
  padding-bottom: 3rem;
}
#us ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.5fr 1fr 1fr 1fr;
  grid-template-areas:
    "header  header"
    "icity  pcity"
    "pcat   icat"
    "ievent pevent";
  place-items: center center;
  list-style: none;
}
#us ul #title {
  color: var(--blue);
  font-weight: bolder;
  font-size: 4rem;
  grid-area: header;
}
#us p {
  font-size: 1.6rem;
  max-width: 40vw;
}
#us .pcity {
  grid-area: pcity;
}
#us .pcat {
  grid-area: pcat;
}
#us .pevent {
  grid-area: pevent;
}
.icity,
.icat,
.ievent {
  min-height: 30rem;
  min-width: 30rem;
  border-radius: 50%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-family: "Baloo Tammudu 2";
}

#us .icity {
  background-image: url("../assets/city2.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  grid-area: icity;
}
#us .icat {
  background-image: url("../assets/category.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  grid-area: icat;
}
#us .ievent {
  background-image: url("../assets/event.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  grid-area: ievent;
}
</style>
