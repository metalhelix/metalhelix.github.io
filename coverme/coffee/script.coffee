
root = exists ? export : this


# load = (error, tech, genomes) ->
#   console.log(tech)
# 
# 
# queue()
#   .defer(d3.csv, 'data/tech.csv')
#   .defer(d3.csv, 'data/genomes.csv')
#   .await(load)
#

root.CoverCtrl = ($scope) ->
  $scope.tech = []
