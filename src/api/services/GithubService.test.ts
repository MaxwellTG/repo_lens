import { Octokit } from "@octokit/core";
import GitHubRepositoryService, { OwnerType } from './GithubService';

// Mock Octokit to control API responses
jest.mock('@octokit/core', () => {
  return {
    Octokit: jest.fn().mockImplementation(() => ({
      request: jest.fn()
    }))
  };
});

describe('GitHubRepositoryService', () => {
  let service: GitHubRepositoryService;
  let mockOctokit: jest.Mocked<Octokit>;

  beforeEach(() => {
    // Resets the singleton instance before each test
    jest.clearAllMocks();
    const privateConstructor = Object.getOwnPropertyDescriptor(
      GitHubRepositoryService.prototype, 
      'constructor'
    )?.value;
    
    // Clear the instance
    (GitHubRepositoryService as any).instance = null;
    
    // Recreate the service
    service = GitHubRepositoryService.getInstance();    
  });

  // User Repositories Tests
  describe('getUserRepositories', () => {
    const mockUsername = 'testuser';
    const mockOptions = { type: 'all' };
    const mockRepos = [
      { id: 1, name: 'repo1' },
      { id: 2, name: 'repo2' }
    ];

    it('should successfully fetch user repositories', async () => {
      // Setup mock implementation
      (service as any).octokit.request.mockResolvedValue({
        data: mockRepos
      });

      const result = await service.getUserRepositories(mockUsername, mockOptions);
      
      expect(result).toEqual(mockRepos);
      expect(service.octokit.request).toHaveBeenCalledWith(
        `GET /users/${mockUsername}/repos`,
        {
          username: mockUsername,
          ...mockOptions,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28"
          }
        }
      );
    });

    it('should throw error when repository fetch fails', async () => {
      const mockError = new Error('Network Error');
      
      // Setup mock to throw an error
      (service as any).octokit.request.mockRejectedValue(mockError);

      await expect(
        service.getUserRepositories(mockUsername, mockOptions)
      ).rejects.toThrow('Network Error');
    });
  });

  // Organization Repositories Tests
  describe('getOrgRepositories', () => {
    const mockOrgName = 'testorg';
    const mockOptions = { type: 'all' };
    const mockRepos = [
      { id: 1, name: 'org-repo1' },
      { id: 2, name: 'org-repo2' }
    ];

    it('should successfully fetch organization repositories', async () => {
      // Setup mock implementation
      (service as any).octokit.request.mockResolvedValue({
        data: mockRepos
      });

      const result = await service.getOrgRepositories(mockOrgName, mockOptions);
      
      expect(result).toEqual(mockRepos);
      expect(service.octokit.request).toHaveBeenCalledWith(
        `GET /orgs/${mockOrgName}/repos`,
        {
          org: mockOrgName,
          ...mockOptions,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28"
          }
        }
      );
    });

    it('should throw error when organization repository fetch fails', async () => {
      const mockError = new Error('Organization Not Found');
      
      // Setup mock to throw an error
      (service as any).octokit.request.mockRejectedValue(mockError);

      await expect(
        service.getOrgRepositories(mockOrgName, mockOptions)
      ).rejects.toThrow('Organization Not Found');
    });
  });

  // Singleton Pattern Tests
  describe('Singleton Pattern', () => {
    it('should always return the same instance', () => {
      const instance1 = GitHubRepositoryService.getInstance();
      const instance2 = GitHubRepositoryService.getInstance();
      
      expect(instance1).toBe(instance2);
    });

    it('should create only one instance', () => {
      const instances = new Set();
      for (let i = 0; i < 5; i++) {
        instances.add(GitHubRepositoryService.getInstance());
      }
      
      expect(instances.size).toBe(1);
    });
  });
});