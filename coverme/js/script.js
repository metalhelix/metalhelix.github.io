function toFixed(value, precision) {
    var precision = precision || 0,
    neg = value < 0,
    power = Math.pow(10, precision),
    value = Math.round(value * power),
    integral = String((neg ? Math.ceil : Math.floor)(value / power)),
    fraction = String((neg ? -value : value) % power),
    padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');

    return precision ? integral + '.' +  padding + fraction : integral;
}

function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function roundNumber(e, t) {
    var n = Math.round(e * Math.pow(10, t)) / Math.pow(10, t);
    return n
}

function numberToWords(number) {
  output = number
  if(number > 999999999) {
    number = roundNumber(number / 1e9, 1);
    output = addCommas(number) + " billion";

  } else if(number > 999999) {
    number = roundNumber(number / 1e6, 1);
    output = addCommas(number) + " million";
  }
  else {
    output = addCommas(number);
  }

  return output
}


function CoverCtrl($scope, $location) {
  $scope.techs = [
  {'name':'HiSeq Normal', 'id':'hiseq', 'reads':186000000},
  {'name':'HiSeq Rapid Run', 'id':'fast', 'reads':70000000},
  {'name':'MiSeq', 'id':'miseq', 'reads':15000000}
  ];
  $scope.organisms = [
  {"name":"Homo sapiens", "id":"hs", "genome_size":3200000000, "transcriptome_size":73418700},
  {"name":"Mus musculus", "id":"mm", "genome_size":2600000000, "transcriptome_size":64072097},
  {"name":"Drosophila melanogaster", "id":"dm", "genome_size":137000000, "transcriptome_size":33407807},
  {"name":"Arabidopsis thaliana", "id":"at", "genome_size":100000000, "transcriptome_size":0},
  {"name":"Caenorhabditis elegans", "id":"ce", "genome_size":97000000, "transcriptome_size":26465725},
  {"name":"Saccharomyces cerevisiae", "id":"sc", "genome_size":12100000, "transcriptome_size":8767705},
  {"name":"Escherichia coli", "id":"ec", "genome_size":4600000, "transcriptome_size":0},
  {"name":"Schizosaccharomyces pombe", "id":"po", "genome_size":12500000, "transcriptome_size":0},
  {"name":"Danio rerio", "id":"dr", "genome_size":1200000000, "transcriptome_size":0},
  {"name":"Phi X", "id":"px", "genome_size":5386, "transcriptome_size":0}
    ];
  $scope.sequence_types = [
  {"name":"Genome", "id":"genome_size", "recommended":20},
  {"name":"Transcriptome", "id":"transcriptome_size", "recommended":15}
  ];
  $scope.coverage_sentiments = [
    ["Whoa there! slow down and save some money!", "Ease off the breaks man, we don't have enough space for all that data!", "Listen, we all love science, but this might be a bit overkill."],
    ["Looks like you are in the clear. Go make some science", "Sounds about right. You're cool.", "Nailed it. Now when are those samples coming?"],
    ["Eh, you're close - might want to bump it up a bit.", "You could probably make it with this if you get lucky", "Squeaking by are we? Budget cuts, I get it."],
    ["No chance. Why even do science in the first place?", "Game over man, game over.", "I see the words 'results unclear' in your future."]
  ];
    
  
  $scope.tech = $scope.techs[0];
  $scope.organism = $scope.organisms[0];
  $scope.sequence_type = $scope.sequence_types[0];

  $scope.reads_per_lane = $scope.tech['reads'];
  $scope.sequence_size = $scope.organism[$scope.sequence_type.id];
  $scope.lanes = 1;
  $scope.samples_per_lane = 1;
  $scope.read_length = 100;

  // $scope.$watch('locationPath', function(path) {
  //   $location.path(path);
  // });

  // $scope.$watch('$location.path()', function(path) {
  //   $scope.locationPath = path;
  // });

  $scope.update_tech = function() {
    $scope.reads_per_lane = $scope.tech['reads'];
  };

  $scope.update_organsim = function() {
    $scope.sequence_size = $scope.organism[$scope.sequence_type.id];
  };

  $scope.update_reads_per_lane = function() {

  };

  $scope.reads_per_lane_text = function() {
    return numberToWords($scope.reads_per_lane);
  };

  $scope.genome_size_text = function() {
    return numberToWords($scope.sequence_size);
  };

  $scope.coverage = function() {
    var raw_coverage =  ($scope.lanes * $scope.read_length * ($scope.reads_per_lane / $scope.samples_per_lane)) / $scope.sequence_size;

    var coverage = raw_coverage;
    // if(isFinite(raw_coverage)) {
    //   coverage = toFixed(raw_coverage, 1) + "x";
    // }
    // else {
    //   coverage = '-.-';
    // }

    return coverage;
  }

  $scope.readspersample = function() {
    var readspersample = ($scope.lanes * ($scope.reads_per_lane / $scope.samples_per_lane))/1000000
    return readspersample;
  }

  $scope.coverage_string = function() {
    var coverage = $scope.coverage();
	 var readspersample = $scope.readspersample();
    if(isFinite(coverage)) {
      coverage = toFixed(coverage, 1) + "x coverage" + " (" + toFixed(readspersample, 0) + " million reads per sample)";
    }
    else {
      coverage = '-.-';
    }

    return coverage;
  }

  // difference between current coverage and recommended
  // positive values == more coverage then needed
  // negative values == you are in the coverage hole - need to anti up.
  $scope.coverage_diff = function() {
    var coverage = $scope.coverage();
    if(!isFinite(coverage)) {
      coverage = 0;
    }
    var coverage_diff = coverage - $scope.sequence_type.recommended;
    return coverage_diff;
  }

  $scope.coverage_amount_string = function() {
    var cov = $scope.coverage_diff();
    var sentence_group = [];
    if(cov > 10) {
      sentence_group = $scope.coverage_sentiments[0]
    } else if(cov > 0) {
      sentence_group = $scope.coverage_sentiments[1]
    } else if(cov > -5) {
      sentence_group = $scope.coverage_sentiments[2]
    } else if(cov > -10) {
      sentence_group = $scope.coverage_sentiments[3]
    } else {
      sentence_group = $scope.coverage_sentiments[3]
    }

    var cov_string = "";
    if(sentence_group.length > 0) {
      cov_string = sentence_group[Math.floor(Math.random()*sentence_group.length)];
    }

    return cov_string;
  }
}
