const { createStatistic } = require('../lib/create-statistic')

describe('Statistics object is handled correctly', () => {
  test('When all fields are provided', () => {
    const stat = {
      system: 'et system',
      engine: 'v1',
      county: 'Fylkemann',
      company: 'sektoren',
      department: 'seksjon',
      description: 'Beskrivelse av jobben som er gjort for dette elementet',
      type: 'test-stat',
      externalId: 'Id001',
      projectId: '12'
    }
    const unmodifiedStat = JSON.parse(JSON.stringify(stat))
    const generatedStat = createStatistic(stat)
    expect(unmodifiedStat.system).toBe(generatedStat.system)
    expect(unmodifiedStat.engine).toBe(generatedStat.engine)
    expect(unmodifiedStat.county).toBe(generatedStat.county)
    expect(unmodifiedStat.company).toBe(generatedStat.company)
    expect(unmodifiedStat.department).toBe(generatedStat.department)
    expect(unmodifiedStat.description).toBe(generatedStat.description)
    expect(unmodifiedStat.type).toBe(generatedStat.type)
    expect(unmodifiedStat.externalId).toBe(generatedStat.externalId)
    expect(unmodifiedStat.projectId).toBe(generatedStat.projectId)
    expect(generatedStat.createdTimestamp).toBeTruthy()
  })
  test('When all required fields are provided, but not optional', () => {
    const stat = {
      system: 'et system',
      engine: 'v1',
      company: 'sektoren',
      description: 'Beskrivelse av jobben som er gjort for dette elementet',
      type: 'test-stat'
    }
    const unmodifiedStat = JSON.parse(JSON.stringify(stat))
    const generatedStat = createStatistic(stat)
    expect(unmodifiedStat.system).toBe(generatedStat.system)
    expect(unmodifiedStat.engine).toBe(generatedStat.engine)
    expect(generatedStat.county).toBe('fylke') // default value from config
    expect(unmodifiedStat.company).toBe(generatedStat.company)
    expect(generatedStat.department).toBe(unmodifiedStat.company)
    expect(unmodifiedStat.description).toBe(generatedStat.description)
    expect(unmodifiedStat.type).toBe(generatedStat.type)
    expect(generatedStat.externalId).toBe('ukjent')
    expect(generatedStat.projectId).toBe('ingen prosjekttilknytning')
  })
  test('When all fields are provided', () => {
    const stat = {
      system: 'et system',
      engine: 'v1',
      county: 'Fylkemann',
      company: 'sektoren',
      department: 'seksjon',
      description: 'Beskrivelse av jobben som er gjort for dette elementet',
      type: 'test-stat',
      externalId: 'Id001',
      projectId: '12',
      etEkstraFelt: 'verdi',
      endaEtEkstraFelt: 'verdi2'
    }
    const unmodifiedStat = JSON.parse(JSON.stringify(stat))
    const generatedStat = createStatistic(stat)
    expect(unmodifiedStat.system).toBe(generatedStat.system)
    expect(unmodifiedStat.engine).toBe(generatedStat.engine)
    expect(unmodifiedStat.county).toBe(generatedStat.county)
    expect(unmodifiedStat.company).toBe(generatedStat.company)
    expect(unmodifiedStat.department).toBe(generatedStat.department)
    expect(unmodifiedStat.description).toBe(generatedStat.description)
    expect(unmodifiedStat.type).toBe(generatedStat.type)
    expect(unmodifiedStat.externalId).toBe(generatedStat.externalId)
    expect(unmodifiedStat.projectId).toBe(generatedStat.projectId)
    expect(generatedStat.createdTimestamp).toBeTruthy()
    expect(generatedStat.etEkstraFelt).toBe('verdi')
    expect(generatedStat.endaEtEkstraFelt).toBe('verdi2')
  })
  test('When not stat object is flat, throws error', () => {
    const stat = {
      system: 'et system',
      engine: 'v1',
      county: 'Fylkemann',
      company: 'sektoren',
      department: 'huhu',
      description: 'Beskrivelse av jobben som er gjort for dette elementet',
      type: 'test-stat',
      externalId: 'Id001',
      projectId: '12',
      etEkstraFelt: 'verdi',
      endaEtEkstraFelt: [' ups']
    }
    expect(() => { createStatistic(stat) }).toThrow(Error)
  })
  test('When not stat object has wrong type, throws error', () => {
    const stat = {
      system: 'et system',
      engine: 'v1',
      county: 'Fylkemann',
      company: 'sektoren',
      department: 12,
      description: 'Beskrivelse av jobben som er gjort for dette elementet',
      type: 'test-stat',
      externalId: 'Id001',
      projectId: '12',
      etEkstraFelt: 'verdi'
    }
    expect(() => { createStatistic(stat) }).toThrow(Error)
  })
})
