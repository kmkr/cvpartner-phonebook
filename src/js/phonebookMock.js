angular.module('phonebookMock', ['phonebook', 'ngMockE2E'])
.run(function ($httpBackend) {
	$httpBackend.whenGET("/api/users").respond([
		{ name: 'Borghild Balder', email: 'Borghild.Balder@foo.com' },
		{ name: 'Gandalf Ask', email: 'Gandalf.Ask@foo.com' },
		{ name: 'Hel Gerd', email: 'Hel.Gerd@foo.com' },
		{ name: 'Thor Vidar', email: 'Thor.Vidar@foo.com' },
		{ name: 'Sif Oden', email: 'Sif.Oden@foo.com' },
		{ name: 'Sigurd Borghildr', email: 'Sigurd.Borghildr@foo.com' }
	]);

	$httpBackend.whenGET(/.*/).passThrough();
});