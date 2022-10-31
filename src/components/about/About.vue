<template>
  <div class="flex flex-col gap-5">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-indigo-600">About</h1>
        <p class="mt-2 text-sm text-gray-700">Have you ever built a potato cannon? (i.e: patator)</p>
      </div>
      <div class="ml-4 flex-shrink-0">
        <button
          @click="startSpeech"
          type="button"
          class="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">{{ (this.playing) ? 'Stop me' : 'Make me talk !' }}</button>
      </div>
    </div>
    <hr>
    <div
      ref="rootNode"
      class="flex flex-col gap-2 text-lg">
      <p>
        A potato cannon is a pipe-based cannon that uses air pressure (pneumatic), or combustion of a flammable gas (aerosol, propane, etc.), to launch projectiles at high speeds. They are built to fire chunks of potato, as a hobby, or to fire other sorts of projectiles, for practical use. Projectiles or failing guns can be dangerous and result in life-threatening injuries, including cranial fractures, enucleation, and blindness if a person is hit.
      </p>
      <p>
        The potato cannon can trace its origin to the World War II-era Holman Projector, which was a shipboard anti-aircraft weapon.
      </p>
      <p>
        All spud guns propel projectiles down their barrels using pressurised gas in the same manner as a firearm (although at a much lower pressure). There are four basic ways that spud guns may achieve this:
        <ul class="list-disc pl-5 inline-block">
          <li>
            By the combustion of a gaseous fuel-air mixture; this is generally called a combustion launcher, and its pressure is limited primarily by the energy density of the fuel-air mixture (less than 100 psi (0.7 MPa) with all safe fuels).
          </li>
          <li>
            By the release of compressed gas (normally air) through a valve; such a launcher is typically referred to as a pneumatic launcher, and its power is limited primarily by the pressure of the air supply, be that from a compressor, manual pump or bottled gas.
          </li>
          <li>
            By the explosion of a dry ice bomb placed in the pipe before the projectile, generally referred to as a dry ice bomb cannon, these are limited in power by the materials and size of the dry ice bomb but firing pressures can be around 200–300 psi (1.4–2.1 MPa).
          </li>
          <li>
            By the combustion of a pre-pressurised fuel-air mixture; this is called a hybrid launcher, and yields higher pressures than that of a normal combustion spud gun, limited only by the construction of the launcher (generally a few hundred pounds-force per square inch).
          </li>
        </ul>
      </p>

      <strong>
        Combustion launchers
      </strong>
      <p>
        Combustion powered spud guns typically have the least complex designs, the four basic elements of which are:
      </p>
      <ul class="list-disc pl-5 inline-block">
        <li>
          A fuel system
        </li>
        <li>
          A combustion chamber
        </li>
        <li>
          An ignition source
        </li>
        <li>
          A barrel
        </li>
      </ul>
      <p>
        In order to fire, the operator loads a projectile into the barrel, adds fuel to the combustion chamber (for example aerosols or propane), and triggers the ignition source (often using a piezoelectric barbecue igniter). The fuel then ignites, creating hot expanding gases, and forcing the projectile out of the barrel. Distances vary greatly depending on many factors, including the type of fuel used, the efficiency of the fuel/air ratio, the combustion chamber/barrel ratio, and the flight characteristics of the projectile. Common distances vary from 100 to 200 meters, and there is a reported case of a cannon exceeding 500 meters of range.
      </p>
      <p>
        Advanced combustion launchers may include metered propane or calcium carbide (acetylene) injection to ensure proper fueling, chamber fans to mix the fuel with the air and accelerate venting of the chamber after firing, multiple spark gaps (spark strips) to decrease combustion time, and high-voltage ignition sources (flyback circuits, stun guns, camera flashes, etc.).
      </p>
      <p>
        Combustion launchers are usually less powerful than their pneumatic or hybrid counterparts, especially when hairspray / alcohol is used as a propellant. Bottled oxygen can be added to the firing chamber, though this can cause an explosion of the pipe when firing, potentially injuring anyone nearby.
      </p>
    </div>
  </div>
</template>

<script>
// @NOTE:
// I could use `this.$refs.rootNode.textContent`, but let's have fun toegether !
// First I had to reformat a bit the html, such that every text would be enclosed in a div with no children divs.
// Then I used a breath first search traversal to label each word.
// Finally I use `setInterval` to change the colors of each word.

// @NOTE:
// The color motion dosn't properly match the word reading:
// It is normal, I'm coloring words without taking in consideration the punctuation...
// There is room for improvments
export default {
  name: "About",
  data() {
    return {
      count: 0,
      wordPlayed: 0,
      playing: false,
      utter: null,
      initialHTML: "",
      interval: null
    }
  },
  mounted() {
    let text = this.$refs.rootNode.textContent
    let utter = new SpeechSynthesisUtterance()

    utter.lang = "en-US"
    utter.text = text
    utter.volume = 0.5
    this.utter = utter

    this.depthFirstTraversal(this.$refs.rootNode)
    this.initialHTML = this.$refs.rootNode.innerHTML
  },
  beforeUnmount() {
    if (this.playing) {
      window.speechSynthesis.cancel()
    }
    this.clearTheMess()
  },
  methods: {
    startSpeech() {
      if (this.playing) {
        this.clearTheMess()
        return
      }
      this.playing = true

      window.speechSynthesis.speak(this.utter)

      this.interval = setInterval(() => {
        if (this.wordPlayed > this.count) {
          clearInterval(this.interval)
          return
        }
        this.wordPlayed ++
        const colorMap = {
          0: "text-amber-500",
          1: "text-amber-500",
          2: "text-green-500",
          3: "text-sky-500",
          4: "text-indigo-700",
          5: "text-fuchsia-600",
          6: "text-amber-500",
          7: "text-green-500",
          8: "text-sky-500",
          9: "text-indigo-700",
          10: "text-fuchsia-600",
        }
        document.getElementById(`${this.wordPlayed}_word`).classList.add(colorMap[Math.floor(Math.random() * 11)], "transition")
      }, 340)
    },
    clearTheMess() {
      this.playing = false
      window.speechSynthesis.cancel()
      this.$refs.rootNode.innerHTML = this.initialHTML
      this.wordPlayed = 0
      clearInterval(this.interval)
    },
    depthFirstTraversal(node) {
      if (node.children.length == 0) {
        this.processNode(node)
        return
      }
      for (let childNode of node.children) {
        if ((childNode.textContent != null) && (childNode.textContent.length > 0)) {
          this.depthFirstTraversal(childNode)
        }
      }
    },
    processNode(node) {
      let words = node.textContent.split(" ")
      let newHtml = words.map((word) => {
        this.count++
        return `<span class="" id="${this.count}_word">${word}</span>`
      }).join(" ")
      node.innerHTML = newHtml
    }
  }
}
</script>
