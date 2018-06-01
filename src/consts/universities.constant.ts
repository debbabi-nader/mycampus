import { University } from './../models/university.model';

export const UNIVERSITIES: University[] = [
    {
        universityName: 'Université de la Manouba',
        universityAbbreviation: 'UMA',
        universityLocation: 'Manouba',
        institutions: [
            {
                institutionName: 'Ecole Nationale des Sciences de l\'Informatique',
                institutionAbbreviation: 'ENSI',
                institutionLocation: 'Manouba',
                degrees: [
                    {
                        degreeName: 'Cycle Ingénieur',
                        degreeAbbreviation: 'CI',
                        grades: 3
                    },
                    {
                        degreeName: 'Masters de Recherche',
                        degreeAbbreviation: 'MR',
                        grades: 2
                    }
                ]
            },
            {
                institutionName: 'Institut Supérieur de Comptabilité et d\'Administration des Entreprises',
                institutionAbbreviation: 'ISCAE',
                institutionLocation: 'Manouba',
                degrees: [
                    {
                        degreeName: 'Licence Fondamentale en Gestion',
                        degreeAbbreviation: 'LFG',
                        grades: 3
                    },
                    {
                        degreeName: 'Mastère de Recherche en Management',
                        degreeAbbreviation: 'MRM',
                        grades: 2
                    },
                    {
                        degreeName: 'Mastère de Recherche en Comptabilité',
                        degreeAbbreviation: 'MRC',
                        grades: 2
                    },
                    {
                        degreeName: 'Mastère Professionnel en Finance',
                        degreeAbbreviation: 'MPF',
                        grades: 2
                    }
                ]
            },
            {
                institutionName: 'Ecole Supérieure de Commerce',
                institutionAbbreviation: 'ESC',
                institutionLocation: 'Manouba',
                degrees: [
                    {
                        degreeName: 'Licence Fondamentale en Gestion Finance',
                        degreeAbbreviation: 'LFGF',
                        grades: 3
                    },
                    {
                        degreeName: 'Licence Appliquée en Gestion Marketing',
                        degreeAbbreviation: 'LAGM',
                        grades: 3
                    },
                    {
                        degreeName: 'Mastère de Recherche en Finance',
                        degreeAbbreviation: 'MRF',
                        grades: 2
                    }
                ]
            },
            {
                institutionName: 'Institut Supérieur des Arts Multimédia de la Manouba',
                institutionAbbreviation: 'ISAMM',
                institutionLocation: 'Manouba',
                degrees: [
                    {
                        degreeName: 'Licence Fondamentale en Informatique Multimédia',
                        degreeAbbreviation: 'LFIM',
                        grades: 3
                    },
                    {
                        degreeName: 'Cycle Ingénieur',
                        degreeAbbreviation: 'CI',
                        grades: 3
                    },
                    {
                        degreeName: 'Mastère de Recherche',
                        degreeAbbreviation: 'MR',
                        grades: 2
                    }
                ]
            }
        ]
    },
    {
        universityName: 'Université de Tunis El Manar',
        universityAbbreviation: 'UTM',
        universityLocation: 'Tunis',
        institutions: [
            {
                institutionName: 'Institut Préparatoire aux Eudes d\'Ingénieurs el Manar',
                institutionAbbreviation: 'IPEIEM',
                institutionLocation: 'Tunis',
                degrees: [
                    {
                        degreeName: 'EUPC Maths Physique',
                        degreeAbbreviation: 'EUPCMP',
                        grades: 2
                    },
                    {
                        degreeName: 'EUPC Physique Chimie',
                        degreeAbbreviation: 'EUPCPC',
                        grades: 2
                    },
                    {
                        degreeName: 'EUPC Technologie',
                        degreeAbbreviation: 'EUPCT',
                        grades: 2
                    }
                ]
            },
            {
                institutionName: 'Institut Supérieur des Sciences Biologiques Appliquées de Tunis',
                institutionAbbreviation: 'ISSBAT',
                institutionLocation: 'Tunis',
                degrees: [
                    {
                        degreeName: 'Licence Appliquée en Biotechnologie',
                        degreeAbbreviation: 'LAB',
                        grades: 3
                    },
                    {
                        degreeName: 'Licence Appliquée en Protection de l\'Environnement',
                        degreeAbbreviation: 'LAPE',
                        grades: 3
                    },
                    {
                        degreeName: 'Mastere Professionnel en Management du Risque et Cindyniques',
                        degreeAbbreviation: 'MPMRC',
                        grades: 2
                    }
                ]
            },
            {
                institutionName: 'Faculté de Droit et des Sciences Politiques de Tunis',
                institutionAbbreviation: 'FDSPT',
                institutionLocation: 'Tunis',
                degrees: [
                    {
                        degreeName: 'Licence Appliquée en Contentieux Fiscal et Administratif',
                        degreeAbbreviation: 'LACFA',
                        grades: 3
                    },
                    {
                        degreeName: 'Mastère Professionnel en Droit des Affaires',
                        degreeAbbreviation: 'MPDA',
                        grades: 2
                    },
                    {
                        degreeName: 'Mastère de Recherche en Droit Privé',
                        degreeAbbreviation: 'MRDP',
                        grades: 2
                    }
                ]
            }
        ]
    }
];