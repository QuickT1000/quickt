import { DatabaseTestingUtility } from './database-testing.utility';

/* tslint:disable:no-string-literal */
describe('DatabaseTestingUtility', () => {
    it('teardown() - should end the database connection and stop the test container when invoked', async () => {
        // Given
        const containerMock: any = { stop: jest.fn() };
        const utility = new DatabaseTestingUtility();

        utility['startedContainer'] = containerMock;

        // When
        await utility.teardown();

        // Then
        expect(containerMock.stop).toHaveBeenCalled();
    });
});
