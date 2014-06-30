var filters = {
				0:[
					{
					"Name":"Type",
					"Options":[
						["Street","WFType = 'Street'"],
						["Wall","WFType = 'Wall'"]
						]
					}
				],
				1:[
					{
					"Name":"Operational",
					"Options":[
						["Yes","OPERATIONAL = 'Yes'"],
						["No","OPERATIONAL = 'No'"]
						]
					},
					{
					"Name":"Lamp Type",
					"Options":[
						["Metal Halide","LampType = 'Metal Halide'"],
						["Sodium","LampType = 'Sodium'"],
						["Unknown","LampType = ''"]
					]
					},
					{
					"Name":"Fixture",
					"Options":[
						["Lumec","FIXTURE = 'Lumec'"],
						["M-400","FIXTURE = 'M-400'"],
						["Missing","FIXTURE = 'Missing'"],
						["Double Lumec","FIXTURE = 'Double Lumec'"],
						["Esplanade","FIXTURE = 'Esplanade'"],
						["All Others","NOT FIXTURE = 'Lumec' AND NOT FIXTURE = 'M-400' AND NOT FIXTURE = 'Missing' AND NOT FIXTURE = 'Double Lumec' AND NOT FIXTURE = 'Esplanade'"]
						]
					}
					
				],
				4:[
					{
					"Name":"Max Parking Time",
					"Options":[
						["Less than 1 Hour","MaxTime_Hrs < 1"],
						["1 Hour","MaxTime_Hrs = 1"],
						["2 Hours","MaxTime_Hrs = 2"]
					]
					},
					{
					"Name":"Pay Station Type",
					"Options":[
						["Single Space","SingleSpace_PayStation = 'Single Space'"],
						["Pay Station","SingleSpace_PayStation = 'Pay Station'"]
					]
					}
				],
				7:[
					{
					"Name":"BIZAssessable",
					"Options":[
						["Yes","BIZAssessable = 'Yes'"],
						["No","BIZAssessable = 'No'"]
						]
					}
				],
				8:[
					{
					"Name":"Tax Status",
					"Options":[
						["City Owned","TAXABLESTA = 'CITY OWNED'"],
						["Taxable","TAXABLESTA = 'TAXABLE'"],
						["Religious","TAXABLESTA = 'RELIGIOUS'"],
						["Non-Taxable","TAXABLESTA = 'RELIGIOUS' OR TAXABLESTA = 'CITY OWNED'"]
						]
					},
					{
					"Name":"Property Class",
					"Options":[
						["Commercial","PROPERTYCL LIKE '2%'"],
						["Industrial","PROPERTYCL LIKE '3%'"],
						["Residential","PROPERTYCL LIKE '4%'"],
						["Utility","PROPERTYCL LIKE '5%'"],
						["Exempt","PROPERTYCL LIKE '7%'"],
						["Special","PROPERTYCL LIKE '9%'"]
						]
					},
					{
					"Name":"Ownership",
					"Options":[
						["In-State Owner","OWNERSTATE = 'MI'"],
						["Out-of-State Owner","NOT OWNERSTATE = 'MI'"]
						]
					}
				]
			};