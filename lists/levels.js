(function(global){
  var module = global.LEVEL = {};
  // ■ = Platform
  // _ = Bounce
  // ✓ = Finish
  // ▲ = Spike
  // □ = Destroyable
  // ≛ = Spawnpoint
  // ◩ = Crumble

  LEVEL.LOBBY = {
    map:  "■■■ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■■■"+
          "■qqooooooooooooooooooooooooooooo≛oooooooooooooooooooooooooooooooqq■"+
          "■q■■■oooooooooooooooooooooooooo■■■oooooooooooooooooooooooooooo■■■q■"+
          "■q■o■■■■■■■ooo■■■■■■■■■ooooooooooooooooooo■■■■■■■■■■ooo■■■■■■■■o■q■"+
          "■q■ooooooooooooooooooo⛶oo■■■ooooooooo■■■oo⛶ooooooooooooooooooooo■q■"+
          "■q■ooooooooooooooooooo⛶ooooooooooooooooooo⛶ooooooooooooooooooooo■q■"+
          "■q■ooooooooooooooooooo⛶ooooooooooooooooooo⛶ooooooooooooooooooooo■q■"+
          "■q■ooooooooooooooooooo⛶oooooooo■■■oooooooo⛶ooooooooooooooooooooo■q■"+
          "■q■ooooooooooooooooooo⛶ooooooooooooooooooo⛶ooooooooooooooooooooo■q■"+
          "■q■oooi■■■■ooo■■■■ooo⛶ooooooooooooooooooooo⛶oooo■■■■ooo■■■■ooooo■q■"+
          "■q■oooooooooooooooooo⛶oooo■■■ooooooo■■■oooo⛶oooooooooooooooooooo■q■"+
          "■q■ooooooooooooooo■■■oooooo■ooooooooo■oooooo■■■ooooooooooooooooo■q■"+
          "■q■ooooooooooooooooo⛶ooooooooooooooooooooooo⛶ooooooooooooooooooo■q■"+
          "■q■ooooooooooooooooo⛶ooooooooooooooooooooooo⛶ooooooooooooooooooo■q■"+
          "■q■oooo■■■■ooo■■■■oo⛶ooooooooo■■■■■ooooooooo⛶ooo■■■■ooo■■■■ooooo■q■"+
          "■q■ooooooooooooooooo⛶o■■■ooooooooooooooo■■■o⛶ooooooooooooooooooo■q■"+
          "■q■ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo%q■"+
          "■q■ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo%q■"+
          "■q■ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo%q■"+
          "■q■oooooooooooooooooooooo■■■■ooooooo■■■■oooooooooooooooooooooooo■q■"+
          "■q■ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■q■"+
          "■q■ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■q■"+
          "■q■oooooooooooooooooooooooooooo■■■oooooooooooooooooooooooooooooo%q■"+
          "■q■ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo%q■"+
          "■q■ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo%q■"+
          "■q■ooooooooooooooooooooooooooooo✓ooooooooooooooooooooooooooooooo■q■"+
          "■q■oooooooooooooooooooooooooo■■■■■■■oooooooooooooooooooooooooooo■q■"+
          "■q■ooooooooooooooooooooooooooooo⛶ooooooooooooooooooooooooooooooo■q■"+
          "■q■oooooooooooooooooooooooooo⛶oo⛶oo⛶oooooooooooooooooooooooooooo■q■"+
          "■qqoooooooooooooooooooooooooo⛶oo⛶oo⛶ooooooooooooooooooooooooooooqq■"+
          "■■■■■■■■■■■___■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■___■■■■■■■■■■■■"
  }

  LEVEL.ONE = {
    map2:  `{"gravity":3,"speed":3,"limitedVision":false,"doors":{},"buttons":{},"visionDistance":5,"backgroundColor":"#d6d6d6","cannons":{"0":{"rotation":1},"49":{"rotation":0},"60":{"rotation":0},"73":{"rotation":1},"74":{"rotation":1},"117":{"rotation":0},"124":{"rotation":0},"137":{"rotation":1},"138":{"rotation":1},"159":{"rotation":1},"199":{"rotation":0}}};c16o■14o■16oc2o■7oc13oc10o■12o■18oc■5oc13oc14o■5oc9o■14o■14oc168o≛66o◩373o2*10o2*29o2*10o2*150o2*41o2*150o2*10o2*29o2*10o2*150o2*41o2*150o2*10o2*29o2*10o2*211o9▲17o▲3o▲20o6▲8o13■3o13■3o16■3o10■3o16■38o✓12■`,
    map:  "oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo\\oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■oooooooooooooooooooooooooo✓ooooooooooooooooooooooooooooooooooooooo■oooooooooooooooooooooooo/■■■ooooooooooooooooooooooooooooooooooooo/■oooooooooooooooooooooo/■■■■■ooooooooooooooooooooooooooooooooooooo■■oooooooooooooooooooo/■■■■■■■oooooooo▲oooooooooooooooooooooooooooo■■oooooooooooooooooo/■■■■■■■■■oooooooo■oooooooooooooooooooooooooooo■■oooooooooooooooo/■■■■■■■■■■■oo≛oooo/■\\oooo/▲▲▲\\oooooo/▲▲▲\\oooooo/■■\\ooooooooooooo/■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■"
  }

  LEVEL.TWO = {
    map:  "ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo✓ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■■■oooooooooooooooooooooooooooooooooooooooooooooooooooooooo▲▲ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■■■■■■ooooooooooooooooooooooooooooooooooooooooooooooooo▲oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■■■oooooooooooooooooooooooooooooooo≛ooooooooooooooooooooooo▲▲oooooooooooooooooooooooooooooooooooooooo■■■\\ooooooooooooooooooo■■■■■■ooooooooooo■■■oooooooooooooooooooooooo■■■■■\\ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■■■■■■■\\ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■■■■■■■■■\\ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■■■■■■■■■■■\\ooooo■■oooooooooooooooooooooooooooooooooooooooooooooooo■■■■■■■■■■■■■\\ooooooooooooooooooooooooooooooooooooooooooooooooooooo■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■"
  }
	
  LEVEL.THREE = {
    map:  "oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo≛oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■■■■■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo____■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■■■_■ooooooooooooooooooooo▲▲ooooooooooooooooooooooooooooooooooooooo■■■_■ooooooooooooooooooo■■■■■■oooooooooooo▲▲ooooooooooooooooooooooo■■■_■ooooooooooooooooooo■____■oooooooooo■■■■■■ooooooooooooooooooooo■■■_■ooooooooooooooooooo■_■■_■oooooooooo■____■ooooooooooooooooooooo■■■_■ooooooooooooooooooo■_■■_■oooooooooo■_■■_■ooooooooooooooooooooo■■■_■ooooooooooooooooooo■_■■_■oooooo__oo■_■■_■ooooooooooooooooooooo■■■_■ooooooooooooooooooo■_■■_■oooooooooo■_■■_■ooooooooooooooooooooo■■■_■ooooooooooooooooooo■_■■_■oooooooooo■_■■_■ooooooooooooooooooooo■■■_■ooooooooooooooooooo■_■■_■oooooooooo■_■■_■ooooooooooooooooooo✓o■■■_■ooooooooooooooooooo■_■■_■oooooooooo■_■■_■ooooooooooooooooo■■■■■■■_■ooooooooooooooooooo■_■■_■oooooooooo■_■■_■ooooooooooooooooo■___■■■_■ooooooooooooooooooo■_■■_■oooooooooo■_■■_■ooooooooooooooooo■_■■■■■_■ooooooooooooooooooo■_■■_■oooooooooo■_■■_■ooooooooooooooooo■_■■■■■_■ooooooooooo___ooooo■_■■_■oooooooooo■_■■_■ooooooooooooooooo■_■■■■■_■ooooooooooooooooooo■_■■_■oooooooooo■_■■_■ooooooooooooooooo■_■■■■■_■ooooooooooooooooooo■_■■_■oooooooooo■_■■_■ooooooo___ooooooo■_■■■■■_■ooooooooooooooooooo■_■■_■oooooooooo■_■■_■ooooooooooooooooo■_■■■■■_■ooooooooooooooooooo■_■■_■oooooooooo■_■■_■ooooooooooooooooo■_■■■■■_■ooooooooooooooooooo■_■■_■oooooooooo■_■■_■ooooooooooooooooo■_■■■■■_■▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲■_■■_■▲▲▲▲▲▲▲▲▲▲■_■■_■▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲■_■■■■■_■■■■■■■■■■■■■■■■■■■■■_■■_■■■■■■■■■■■■_■■_■■■■■■■■■■■■■■■■■■■_■■■■■_______________________■■______________■■_____________________■■",
  }
		
  LEVEL.FOUR = {
    map:  "oooooooooooooooooooooooooooooooooooo▲■ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo▲■ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo▲■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooo✓o▲▲oooo■ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■■■■■■■oo■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo□oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo□oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo□oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■oooooooo▲ooooooooooooooooooooooooooooooooo■■■ooooooooooooooooooooo■oooooo■■■ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo□ooooooooooooooooooooooooooooooooooo■■ooooooooooooooooooooooooooooo□ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■oooooo■■■■■ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■■ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo▲oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■▲ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■■▲oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■■■■■■■■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo□ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo≛oooo□oooooooooooooooooooooo▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲■■■■■■■■■■■■■■■■■■■■■____■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■"
  }

  LEVEL.FIVE = {
    map:  "oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooSSSSooooooooooooooooooooooooooooooooooooooooooooooooooooooo■■■oooooooooooooo■■■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo◩◩◩oooooo✓oooooooooooooooo≛oooooo◩◩◩ooooooooooooooooooooooooooooooooooooooo■■■oooooooooooooo■■■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■"
		
  }
  LEVEL.SIX = {
    map:  "ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo▲oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■ooo■oooooo■oooo■oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo✓ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo■■■oooooooooooooooooooooo■ooooooooooooooooooooooooooooooooooooooooo■■■oooooooooooooooooooooo■oooooooooooooooooooooooooooooooo⛶⛶⛶oooooo■■■oooooooooooooooooooooo■ooooooooooooooooooooooooooooooooooooooooo■■■oooooooooooooooooooooo■oooooooooooooooooooooooo■■■oooooooooooooo■■■ooooooooooooooooooo■oo■oooooooooooooooooooooooo■■■▲▲▲▲▲▲▲▲▲▲▲▲▲▲■■■ooooooooooooooooooo■oo■oooooooooooooooooo■■■ooo■■■■■■■■■■■■■■■■■■■■ooooooooooooooooooo■oo■oooooooooooooooooo■■■ooo■■■■■■■■■■■■■■■■■■■■ooooooooooooooo■ooo■oo■ooooooooo■■■oooooo■■■ooo■■■oooooooooooooo■■■ooooooooooooooo■ooo■oo■ooooooooo■■■oooooo■■■ooo■⛶⛶oooooooooooooo■■■ooooooooooooooo■ooo■oo■ooooooooo⛶⛶■▲▲▲▲▲▲■■■▲▲▲■⛶■oooooooooooooooooooooooooo■ooooo■ooo■oo■oooo≛oooo■⛶■■■■■■■■■■■■■■⛶■ooooooo▲ooo▲oooooooooooooo■ooooo■ooo■oo■oo■■■■■■■■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■■■■■■■■■■■■■■■■■■■■____■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶"
  }
	LEVEL.SEVEN = {
		map:"⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■■■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■■■⛶⛶⛶⛶⛶⛶⛶⛶■■■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■✓⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■■■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■■■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■■■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■■■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■■■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■■■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶≛⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶___⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■"
	}
  LEVEL.EIGHT = {
    map:  "ooooooooooooooooooooooooooooooooooooooo□ooooooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooo□ooooooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooo□ooooooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooo□ooooooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooo□ooooooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooo□ooooooooooooooooooooooooooo"+
					"ooooooooo◩◩◩◩◩oooo◩◩◩◩ooooooooooooooooo□ooooooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooo□oo■oooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooo□ooooooooooooooooooooooooooo"+
					"ooooooo◩ooooooooooooooooooooooooooooooo□ooooooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooo□oooooooooo▲oo▲▲▲oo▲▲oo▲▲▲o✓"+
					"ooooooooooooooooooooooooooooooooooooo■■■oooooooo■■■■■■■■■■■■■■■■■■■"+
					"oo◩◩◩oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"+
					"ooooooo◩ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"+
					"oooooooooo◩◩◩oooooooooooooooooooooooooooooooooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"+
					"ooooo◩◩◩◩oooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"+
					"oo≛oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"+
					"oo■■ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"+
					"oooooooooooooooooooooooooooooo___oooooooooooooooooooooooooooooooooo"+
					"ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"+
					"▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲"+
					"■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■"
  }
	LEVEL.NINE = {
		map:"ooooooooooo■oooooooooooooooo■oooooooooooooooooooooooooooooooooooooo"+
				"ooooooooooo■oooooooooooooooo■oooooooooooooooooooooooooooooooooooooo"+
				"ooooooooooo■oooooooooooooooo■oooooooooooooooooooooooooooooooooooooo"+
				"oo≛oooooooo■oooooooooooooooo■oooooooooo■■■■■■■■■■■■■■■■■■■■■■■■■ooo"+
				"■■■■■■■oooo■o■■■■■■■oooooooo■oooooooooo■___■___■_■_■___■___■___■ooo"+
				"■■■■■■■oooo■ooooooo■oooooooo■ooooooo■■o■_■_■_■_■_■_■_■_■_■■■_■■■ooo"+
				"■■■■■■■oooo■ooooooo■oooooooo■oooooooooo■__■■_■_■_■_■_■_■_■■■__■■ooo"+
				"■■■■■■■oooo■ooooooo■oooooooo■oooooooooo■_■_■_■_■_■_■_■_■_■■■_■■■ooo"+
				"■■■■■■■oooo■■■ooooo■oooooooo■oooo■■oooo■___■___■___■_■_■___■___■ooo"+
				"■■■■■■■oooo■ooooooo■oooooooo■oooooooooo■■■■■■■■■■■■■■■■■■■■■■■■■ooo"+
				"■■■■■■■oooo■ooooooo■oooooooo■oooooooooo■ooooooooooooooooooooooooooo"+
				"■■■■■■■oooo■ooooooo■oooo▲▲▲▲■oooooooooo■ooooooooooooooooooooooooooo"+
				"■■■■■■■ooooooo■■ooo■oooo■■■■■■■■ooooooo■ooooooooooooooooooooooooooo"+
				"■■■■■■■oooooooooooo■ooooooooooooooooooo■ooooooooooooooooooooooooooo"+
				"■■■■■■■oooooooooooo■ooooooooooooooooooo■ooooooooooooooooooooooooooo"+
				"■■■■■■■oooooooooooo■ooooooooooooooo■■oo■oooooooooooooooo▲▲▲▲ooooooo"+
				"■■■■■■■ooooooooo■■■■ooooooooooooooooooo■oooooooooooooooo■■■■ooooooo"+
				"■■■■■■■oooo▲oooo■■■■ooooooo▲ooooooooooo■oooooooooooooooo■■■■ooooooo"+
				"■■■■■■■oooo■oooo■■■■ooooooo■ooo■■■■■■■■■oooooooooooooooo■■■■ooooooo"+
				"■■■■■■■oooo■oooo■■■■ooooooo■ooo■oooooooooooooooooooooooo■■■■ooooooo"+
				"■■■■■■■oooo■oooo■■■■ooooooo■___■oooooooooooooooooooooooo■■■■ooooooo"+
				"■■■■■■■oooo■____■■■■ooooooo■ooo■oooooooooooooo▲▲▲▲oooooo■■■■ooooooo"+
				"■■■■■■■oooo■■■■■■■■■ooooooo■ooo■oooooooooooooo■■■■oooooo■■■■ooooooo"+
				"■■■■■■■oooo■■■■■■■■■ooooooo■ooo■oooooooooooooo■■■■oooooo■■■■ooooooo"+
				"■■■■■■■oooo■■■■■■■■■ooooooo■ooo■oooooooooooooo■■■■oooooo■■■■ooooooo"+
				"■■■■■■■oooo■■■■■■■■■ooooooo■ooo■oooooooooooooo■■■■oooooo■■■■ooooooo"+
				"■■■■■■■oooo■■■■■■■■■ooooooo■ooo■oooo▲▲▲▲oooooo■■■■oooooo■■■■ooooooo"+
				"■■■■■■■oooo■■■■■■■■■ooooooo■ooo■oooo■■■■oooooo■■■■oooooo■■■■ooooooo"+
				"■■■■■■■oooo■■■■■■■■■ooooooo■ooo■oooo■■■■oooooo■■■■oooooo■■■■ooooooo"+
				"■■■■■■■____■■■■■■■■■_______■ooo■o✓oo■■■■______■■■■______■■■■_______"+
				"■■■■■■■____■■■■■■■■■_______■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■"
	}
	LEVEL.TEN = {
		map:	"ooooooooo■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■"+
					"ooooooooo□ooooooooooooo■oooooooooooooooooooo■ooooo■ooo■ooooooooooo■"+
					"ooooooooo□oooooooooo■oo■oooooooooooooooooooo■ooooo■ooo■ooooooooooo■"+
					"ooooooooo□oo▲oo▲oooo■oo■oo▲ooooooooooooooooo■ooooo■ooo■oooo◩◩o■ooo■"+
					"ooooooooo□oo⛶oo⛶oooo■ooooo⛶oooooooooooooo▲ooooo▲oooooo■ooooooo■ooo■"+
					"ooooooooo■◩◩■◩◩■◩◩◩◩■◩◩◩◩◩◩◩◩◩■oooooooooo■ooooo■oooooo■ooooooo■ooo■"+
					"■■■■■oooo■▲▲■▲▲■▲▲▲▲■▲▲▲▲▲▲▲▲▲■oooooooooo■ooooo■oooooo■ooooooo■ooo■"+
					"■■■■■oooo■■■■■■■■■■■■■■■■■■■■■■ooo■■■■■■■■■■■■■■■■■ooo■oo◩◩ooo■ooo■"+
					"■■■■■ooooooooooooooooooooooooo■ooo■ooooooooooo■■■⛶⛶ooo□ooooooo■ooo■"+
					"■■■■■ooooooooooooooooooooooooo■ooo■ooooooooooo■⛶⛶⛶■ooo□ooooooo■ooo■"+
					"■■■■■o■■oooooooooooooooooooooo■ooo■ooooooooooo⛶⛶■■■ooo□ooo▲▲▲▲■ooo■"+
					"■■■■■ooooooooooooooooooooooooo■ooo■ooooooooooo■■■■■■■■■■■■■■■■■ooo■"+
					"■■■■■ooooooooooooooooooooooooo■ooo■ooooooooooo■ooooooooooooooo■ooo■"+
					"■■■■■ooooooooooooooooooooo■ooo■ooo■ooooooooooo■ooooooooooooooo■ooo■"+
					"■■■■■oooo■ooooooooo■■■oooo■ooo■ooo■ooooooooooo■ooooo▲ooo▲ooooo■ooo■"+
					"■■■■■◩ooo■oooooooooooooooo■ooo■oooooo■■■■■■■oo■□□□■■■■■■■■■ooo■ooo■"+
					"■■■■■oooo■oooooooooooooooo■ooo■oooooo■oooooooo■ooooooooooo■ooo□ooo■"+
					"■■■■■oooo■oooooooooooooooo■ooo■oooooo■oooooooo■ooooooooooo■ooo□ooo■"+
					"■■■■■oooo■oooooooooooooooo■ooo■oooooo■oooooooo■ooooooo■ooo■▲oo□oo▲■"+
					"■■■■■ooo◩■oooooooooooo■■■o■ooo■oooooo■ooo■■ooo■oo■■ooo■ooo■■■■■■■■■"+
					"■■■■■oooo■oooooooooooooooo■ooo■oooooo■ooo■■ooo■ooooooo■ooooooooooo■"+
					"■■■■■oooo■oooooooooooooooo■ooo■ooo___■ooo■■ooo■ooooooo■ooooooooooo■"+
					"■■■■■◩ooo■oooooooooooooooo■ooo■ooo■■■■ooo■■ooo■ooooooo■ooooooooo✓o■"+
					"■■■■■oooo■oooooooooooooooo■ooo■ooo■■■■ooo■■ooo■ooooooo■ooooooo■■■■■"+
					"■■■■■oooo■oooooooooooooooo■ooo■ooo■■■■ooo■■___■ooo■■■■■ooooooo■■■■■"+
					"■■■■■oo◩o■oooooooooooooooo■ooo■ooo■■■■oooooooooooo■■■■■ooooooo■■■■■"+
					"■■■■■oooo■oooooooooooooooo■ooooooo■■■■oooooooooooo■■■■■ooooooo■■■■■"+
					"■oooooooo■oooooooooooooooo■ooooooo■■■■oooooooooooo■■■■■oo___oo■■■■■"+
					"■oooooooo■▲ooooooooooooooo■ooooooo■■■■◩◩◩◩◩◩◩◩◩◩◩◩■■■■■ooooooo■■■■■"+
					"■o≛oo◩▲▲▲■________________■■■■■▲▲▲■■■■▲▲▲▲▲▲▲▲▲▲▲▲■■■■■▲▲▲▲▲▲▲■■■■■"+
					"■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■"
	}
	LEVEL.ELEVEN = {
		map:"ooooooooooooooooooooooooooo✓■oooooooooooooooooooooooooooooooooooooo"+
				"o■■■■■■■■■■■■■■■■■■■■■■■■■■■■oooooooooooooooooooooooooooooooooooooo"+
				"o▲▲▲▲▲▲▲▲▲▲▲▲▲▲oooooo■oooooo■oooooooooooooooooooooooooooooooooooooo"+
				"ooooooooooooooooooooo■oooooo■≛ooooooooooooooooooooooooooooooooooooo"+
				"■■■■■■■■■■■■■■■■■oooo■oo■■oo■■■ooo■oooo■oooo■■ooo■oooo■ooo■■■■■■■oo"+
				"■■◩_◩_◩_◩_◩_◩■ooooo■■■ooo■oo■_■ooooooooooooo■■oooooooooooo■_◩_◩_■oo"+
				"■■◩_◩_◩_◩_◩_◩■ooooo■_■ooo■◩o■◩■▲▲▲▲▲▲▲▲▲▲▲▲▲■■▲▲▲▲▲▲▲▲▲▲▲▲■◩_◩_◩■oo"+
				"■■_■■■■■■■■■■□ooooo■_■ooo■oo■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■oo"+
				"■■◩■■⛶⛶⛶⛶⛶⛶⛶⛶⛶ooooo■_■ooo■oo■ooooooooooooooooooooooooooooooooooo■oo"+
				"■■_■⛶⛶■■■■■■■□ooooo■_■ooo■oo■ooooooooooooooooooooooooooooooooooo■oo"+
				"■■◩■⛶■■■⛶⛶⛶■■■■■■■■■_■ooo■o◩■ooooooooooooooooooooooooooooooooooo■oo"+
				"■■_■⛶■_■⛶■⛶■_◩■■■■■■■■ooo■oo■⛶⛶■■■⛶⛶■■■⛶⛶■■■⛶⛶■■■⛶⛶■■■⛶⛶■■o■■■■■■oo"+
				"■■■■⛶■◩■⛶■⛶■■■■■ooooo■ooo■oo■oo■_■oo■_■oo■_■oo■_■oo■_■oo■■ooooooooo"+
				"■■⛶⛶⛶■_■⛶■⛶■⛶⛶⛶■ooooo■ooo■oo■oo■◩■oo■_■oo■◩■oo■_■oo■◩■oo■■ooooooooo"+
				"■■⛶■■◩■■⛶■⛶⛶⛶■⛶□ooooo■ooo■◩o■oo■_■oo■◩■oo■_■oo■◩■oo■_■oo■■ooooooooo"+
				"■■⛶■_■⛶⛶⛶■■■■■⛶⛶ooooo■ooo■oo■oo■_■oo■◩■oo■_⛶oo■◩■oo■_■oo■■■■■■■■ooo"+
				"■■⛶■■■⛶■■■■■■■■□■■ooo■ooo■oo■⛶⛶■◩■⛶⛶■_■⛶⛶■◩⛶■■■_■⛶⛶■◩■⛶⛶■oooooo■ooo"+
				"■■⛶⛶⛶■⛶⛶⛶⛶⛶⛶⛶⛶⛶⛶■■ooo■ooo■oo■▲▲■_■▲▲■_■▲▲■_⛶▲▲■_■▲▲■_■▲▲■o■■■■o■ooo"+
				"■■■■⛶■■■■■■■■■■⛶■■ooo■ooo■o◩■■■■■■■■■■■■■■■⛶■■■■■■■■■■■■■o■_◩■o■ooo"+
				"■■■■⛶■_◩_◩_◩_◩■⛶■■ooooooo■oo■ooooooooooooooooooooooooooooo■◩_■o■ooo"+
				"■■■■⛶■■■■■■■_◩■⛶■■ooooooo■oo■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■o■ooo"+
				"■■◩■⛶⛶⛶⛶⛶⛶⛶■_◩■⛶■■ooooooo■ooooooooooooooooooooooooooooooooooooo■ooo"+
				"■■_◩■■■■■■⛶■◩_■⛶■■ooooooo■◩oooooooooooooooooooooooooooooooooooo■ooo"+
				"■■◩_◩■■■■■⛶■◩_■⛶■■ooooooo■oooooooooooooooooooooooooooooo■oooooo■ooo"+
				"■■_◩_◩■■■■⛶■■■■⛶■■ooooooo■oooooooooooooooooooooooooooo■oooooooo■ooo"+
				"■■◩_◩_◩■■■⛶⛶⛶■■⛶■■ooooooo■▲ooooooooo■oooooooooooooooooooooo■ooo■ooo"+
				"■■_◩_◩_◩■■■■⛶■■⛶■■o_____o■■■■ooo■oooooooooooooooooooooooooooooo■ooo"+
				"■■◩_◩_◩_◩■■■⛶■■⛶■■o_◩_◩_o■◩_■ooooooooooo■oooo■ooo■ooo■oooooooo■■___"+
				"■■_◩_◩_◩_◩■■⛶■■⛶■■o__◩__o■_◩■oooooooooooooooooooooooooooooooooo■_◩_"+
				"■■■■■■■■■■■■⛶⛶⛶⛶⛶⛶o_◩_◩_▲■◩_■▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲■___"+
				"■■■■■■■■■■■■■■■■■■■_____■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■"
	}
})(this);

var level = 1;
var finish;

function loadLevel() {
  var count = 0;
  for(var thing in LEVEL) {
    count++;
    if(count == level) return LEVEL[thing];
  }
}

function setLevel(lvl) {
  updateMap = true;
  level = lvl;
  particles = [];
	crumblingBlocks = [];
  platforms = loadLevel().map.split('');
	text = lvl.text;
	document.getElementById('text').innerHTML = `${text}`;
	// document.getElementById('text').style = 'visibility:visible;';
  resetPlayer();
  resetStopwatch();
}

function nextLevel() {
  updateMap = true;
  deaths = 0;
  particles = [];
	crumblingBlocks = [];
  if(level == getLengthOfObjectList(LEVEL) ) {
    stopStopwatch();
		alert(`You have completed all the levels for now. Come back later for more levels, try again for a new record, or design a level.`)
    mainMenu();
    resetPlayer()
		unlockLogoSkin()
    return;
  }
  level++;

  // if(loadLevel().map2 != null && loadLevel().map2.includes("{") && admin) {
  //   var input = LEVEL.ONE.map2;
  //   var level2 = decompressMapData(input.split(';')[1]);
  // 	modifiers = JSON.parse(input.split(';')[0]);
    
  //   convertPlayerSpeed(modifiers.speed);
  //   convertGravity(modifiers.gravity);
  //   limitedVision = modifiers.limitedVision;
  	
  //   customLevel = true;
  //   platforms = level2.split('');
  //   customLevelName = 'Imported Level';
  //   customLevelMap = level2;
  // } else {
    platforms = loadLevel().map.split('');
  // }
  resetPlayer();
}

function loadLevelFromData(mapData) {
  updateMap = true;
  customLevel = true;
  resetPlayer();
  resetStopwatch();
  setTimeout(function() {
    platforms = mapData.split('');
    var i = platforms.indexOf('≛');
    player.x = (i % 67)*gridBlockWidth;
    player.y = Math.floor(i/67,1)*gridBlockHeight;
  },1);
}

var customLevel = false;
var customLevelMap;
var level;
var customLevelName = 'Imported Level';
var limitedVision = false;
function importLevel() {
	var input = prompt('Paste Your Level')
  var level = decompressMapData(input.split(';')[1]);
	modifiers = JSON.parse(input.split(';')[0]);
  
  convertPlayerSpeed(modifiers.speed);
  convertGravity(modifiers.gravity);
  limitedVision = modifiers.limitedVision;

  if(level.length != 2077) {
    alert('Error! The text you pasted was not recognized as a level '+level.length);
    return;
  }
	
  customLevel = true;
  platforms = level.split('');
  customLevelName = 'Imported Level';
  customLevelMap = level;
  resetPlayer();
}