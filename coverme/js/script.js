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

//../../../coverme_sizes/summary.11-01-2019.txt

function CoverCtrl($scope, $location) {
  $scope.techs = [
  {'name':'NovaSeq SP*', 'id':'novasp', 'reads':650000000},
  {'name':'NovaSeq S1', 'id':'novas1', 'reads':1300000000},
  {'name':'NovaSeq S2', 'id':'novas2', 'reads':3300000000},
  {'name':'NovaSeq S3', 'id':'novas3', 'reads':8000000000},
  {'name':'HiSeq High Output', 'id':'hiseq', 'reads':250000000},
  {'name':'HiSeq Rapid Run', 'id':'fast', 'reads':300000000},
  {'name':'NextSeq High Output', 'id':'nshi', 'reads':400000000},
  {'name':'NextSeq Mid Output', 'id':'nsmid', 'reads':130000000},
  {'name':'MiSeq v3', 'id':'miseq3', 'reads':22000000}
  {'name':'MiSeq v2', 'id':'miseq2', 'reads':12000000},
  ];
  $scope.organisms = [
  {"name":"Homo sapiens", "id":"hg38", "genome_size":3100000000, "transcriptome_size":85000000, "transcriptome_size_unspliced":1300000000},
  {"name":"Mus musculus", "id":"mm10", "genome_size":2700000000, "transcriptome_size":78000000,"transcriptome_size_unspliced":1000000000},
  {"name":"Drosophila melanogaster", "id":"dm6", "genome_size":140000000, "transcriptome_size":35000000,"transcriptome_size_unspliced":94000000},
  {"name":"Caenorhabditis elegans", "id":"ce11", "genome_size":100000000, "transcriptome_size":29000000,"transcriptome_size_unspliced":63000000},
  {"name":"Saccharomyces cerevisiae", "id":"sacCer3", "genome_size":12000000, "transcriptome_size":8800000,"transcriptome_size_unspliced":8800000},
  {"name":"Schizosaccharomyces pombe","id":"pombe_ASM294v2", "genome_size":13000000, "transcriptome_size":11000000,"transcriptome_size_unspliced":11000000},
  {"name":"Danio rerio", "id":"danRer11", "genome_size":1400000000, "transcriptome_size":71000000,"transcriptome_size_unspliced":770000000},
  {"name":"Gallus gallus","id":"galGal6", "genome_size":1100000000, "transcriptome_size":42000000,"transcriptome_size_unspliced":490000000},
  {"name":"Petromyzon marinus","id":"petMar2", "genome_size":890000000, "transcriptome_size":13000000,"transcriptome_size_unspliced":130000000},
  {"name":"Rattus norvegicus","id":"rn6", "genome_size":2900000000, "transcriptome_size":52000000,"transcriptome_size_unspliced":840000000},
  {"name":"Astyanax mexicanus","id":"astMex_2", "genome_size":1300000000, "transcriptome_size":74000000,"transcriptome_size_unspliced":630000000},
  {"name":"Xenopus tropicalis","id":"xenTro3", "genome_size":1500000000, "transcriptome_size":37000000,"transcriptome_size_unspliced":420000000},
  {"name":"Ptychodera flava","id":"pfl_ver1", "genome_size":1200000000, "transcriptome_size":44000000,"transcriptome_size_unspliced":600000000},
  {"name":"Nematostella vectensis","id":"nemVec1", "genome_size":360000000, "transcriptome_size":29000000,"transcriptome_size_unspliced":110000000},
  {"name":"Schmidtea mediterranea","id":"smed_dd_g4", "genome_size":770000000, "transcriptome_size":42000000,"transcriptome_size_unspliced":240000000},
  {"name":"Pomacea canaliculata","id":"pcan_BGI_2018", "genome_size":440000000, "transcriptome_size":76000000,"transcriptome_size_unspliced":300000000},
  {"name":"Nothobranchius furzeri","id":"nfu_20150522", "genome_size":1200000000, "transcriptome_size":65000000,"transcriptome_size_unspliced":540000000}
    ];
  $scope.sequence_types = [
  {"name":"Genome", "id":"genome_size", "recommended":20},
  {"name":"Transcriptome", "id":"transcriptome_size", "recommended":15},
  {"name":"Transcriptome (unspliced)", "id":"transcriptome_size_unspliced", "recommended":15}
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
